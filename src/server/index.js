const next = require('next');
const Hapi = require('hapi');
const Good = require('good');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

const { schema } = require('./graphql/schema');
const { pathWrapper, defaultHandlerWrapper, nextHandlerWrapper } = require('./next-wrapper');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src', dev });
const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 4000
});
/*
const pluginOptions = [
    {
        name: 'Good',
        register: Good.register,
        options: {
            ops: false,
            reporters: {
                console: [{
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }
];
*/

app
.prepare()
.then(async () => {
    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => ({ status: 'OK' })
    });

    server.route({
        method: 'GET',
        path: '/_next/{p*}', /* next specific routes */
        handler: nextHandlerWrapper(app)
    });

    server.route({
        method: 'GET',
        path: '/{p*}', /* catch all route */
        handler: defaultHandlerWrapper(app)
    });

    try {
        await server.register({
            plugin: graphqlHapi,
            options: {
                path: '/graphql',
                graphqlOptions: {
                    schema,
                },
                route: {
                    cors: false,
                },
            },
        });

        await server.register({
            plugin: graphiqlHapi,
            options: {
                path: '/graphiql',
                graphiqlOptions: {
                    endpointURL: '/graphql'
                },
            },
        });
        // await server.register(pluginOptions); Good is not ready for Hapi 17 yet.
        await server.start();

        console.log('Server running at:', server.info.uri);
    } catch (error) {
        console.log('Error starting server');
        console.log(error);
        process.exit(1);
    }
});

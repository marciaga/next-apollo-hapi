// const client = request.redis.client;
// await client.set('hello', request.params.val);

const channels = [{
    id: 1,
    name: 'soccer',
}, {
    id: 2,
    name: 'baseball',
}];

let nextId = 3; // garbage

export const resolvers = {
    Query: {
        channels: async (root, args, context) => {
            try {
                const { redisClient } = context;
                // const result = await redisClient.get('beer');
                // console.log(result)

                return channels;
            } catch (e) {
                console.log(e);
            }
        },
    },
    Mutation: {
        addChannel: async (root, args, context) => {
            try {
                const { redisClient } = context;
                const newChannel = {
                    id: nextId++,
                    name: args.name
                };

                // await redisClient.set('beer', JSON.stringify(newChannel));
                channels.push(newChannel); // the things we do for mocking...

                return newChannel;
            } catch (e) {
                console.log(e);
            }
        },
    },
};

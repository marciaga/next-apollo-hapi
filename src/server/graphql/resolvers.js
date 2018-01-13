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
        channels: (root, args, context) => {
            // console.log(context.redisClient)
            return channels;
        },
    },
    Mutation: {
        addChannel: (root, args, context) => {
            const newChannel = {
                id: nextId++,
                name: args.name
            };

            channels.push(newChannel); // the things we do for mocking...

            return newChannel;
        },
    },
};

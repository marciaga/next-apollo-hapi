export const resolvers = {
    Query: {
        beers: async (root, args, context) => {
            try {
                const { redisClient } = context;

                const result = await redisClient.get('beers');

                if (!result) {
                    return [];
                }

                return JSON.parse(result);
            } catch (e) {
                console.log(e);
            }
        },
    },
    Mutation: {
        createBeer: async (root, args, context) => {
            try {
                const { redisClient } = context;
                const { name, style, brewery, abv, tapped } = args;
                // get all the beers

                // await redisClient.set('beer', JSON.stringify(newChannel));
                // channels.push(newChannel); // the things we do for mocking...
                //
                // return newChannel;
            } catch (e) {
                console.log(e);
            }
        },
        updateBeer: async (root, args, context) => {
            try {
                const { redisClient } = context;
                const { id, name, style, brewery, abv, tapped } = args.input;
                // get all the beers
                const result = await redisClient.get('beers');

                if (!result) {
                    // there's no beers, so add it
                    await redisClient.set('beers', JSON.stringify([
                        {
                            id,
                            name,
                            style,
                            brewery,
                            abv,
                            tapped
                        }
                    ]));

                    return args.input; // maybe don't do this
                }
                // otherwise, find beer in result
                const r = JSON.parse(result);
                console.log('result', r);

                const newResult = r.map((f, i) => {
                    const d = {
                        id,
                        name,
                        style,
                        brewery,
                        abv,
                        tapped
                    };


                    if (f.id === id) {
                        return d;
                    }

                    return f;
                });

                await redisClient.set('beers', JSON.stringify(newResult));

                return args.input; // maybe don't do this
            } catch (e) {
                console.log(e);
            }
        }
    },
};

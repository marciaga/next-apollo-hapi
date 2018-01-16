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
        updateBeer: async (root, args, context) => {
            try {
                const { redisClient } = context;
                const { id, name, style, brewery, abv, tapped } = args.input;
                // get all the beers
                const result = await redisClient.get('beers');

                // if (!result) {
                //     // there's no beers, so add one
                //     await redisClient.set('beers', JSON.stringify([
                //         {
                //             id,
                //             name,
                //             style,
                //             brewery,
                //             abv,
                //             tapped
                //         }
                //     ]));
                //
                //     return args.input; // maybe don't do this
                // }
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

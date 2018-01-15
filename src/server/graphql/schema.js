import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
# simplify the schema by defining an input
# Input types allow client mutation signatures to stay constant and provide better readability in the schema.
input BeerInput {
    id: ID
    name: String
    style: String
    brewery: String
    abv: String
    tapped: String
}

type Beer {
    id: ID!
    name: String
    style: String
    brewery: String
    abv: String
    tapped: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "beers" - which returns a list of beers.
type Query {
   beers: [Beer]    # "[]" means this is a list of beeers
}
# The mutation root type, used to define all mutations
type Mutation {
    createBeer(input: BeerInput): Beer
    updateBeer(input: BeerInput): Beer
}

`;
const logger = { log: e => console.log('Logger: ', e) };

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger,
    allowUndefinedInResolve: false,
 });

export { schema }

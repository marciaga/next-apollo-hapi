import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

// Replace this URL by your APIs simple endpoint URL:
const uri = 'http://localhost:4000/graphql';

const createClient = (initialState) => {
    const HttpLinkData = {
        uri,
        opts: {
            credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
        }
    };

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink(HttpLinkData),
        cache: new InMemoryCache().restore(initialState || {})
    });
};

export default (initialState) => {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return createClient(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        console.log('IN !apolloClient', apolloClient);
        apolloClient = createClient(initialState)
    }

    console.log('return statement', apolloClient);
    return apolloClient
}

# Starter project using Next.js 4 with Hapi 17, GraphQL, and Apollo.

## Run Redis Docker container:
```
$ docker run --name next-apollo-hapi -d -p 6379:6379 redis
```
## Configure Redis options in src/server/index.js in the HapiRedis registration:
```
const config = {
    host: 'localhost',
    port: 6379,
    db: 1 // must be a number
};
```
## Seed the Redis DB:
```
$ yarn seed
```

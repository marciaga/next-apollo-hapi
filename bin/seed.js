const Redis = require('ioredis');
const redis = new Redis(6379, 'localhost', { db: 1 });

const data = [{
    id: "1",
    name: "",
    abv: "",
    style: "",
    brewery: "",
    tapped: ""
}, {
    id: "2",
    name: "",
    abv: "",
    style: "",
    brewery: "",
    tapped: ""
}, {
    id: "3",
    name: "",
    abv: "",
    style: "",
    brewery: "",
    tapped: ""
}, {
    id: "4",
    name: "",
    abv: "",
    style: "",
    brewery: "",
    tapped: ""
}, {
    id: "5",
    name: "",
    abv: "",
    style: "",
    brewery: "",
    tapped: ""
}, {
    id: "6",
    name: "",
    abv: "",
    style: "",
    brewery: "",
    tapped: ""
}];

redis.set('beers', JSON.stringify(data))
.then(result => {
    console.log(result);
    process.exit(0);
})
.catch(e => {
    console.log(e);
    process.exit(1);
});

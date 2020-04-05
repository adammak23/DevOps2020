const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient(
    {
        host: 'my-redis-server',
        port: 6379
    }
);

client.set('counter', 0)

app.get('/', (req, res) => 
{
    //process.exit(0);
    client.get('counter', (err, counter_value) =>
    {
        resizeTo.send('Counter: ' + counter_value);
        client.set('counter', parseInt(counter_value) + 1);
    });

});

app.listen(8080, () =>
{
    console.log("Listening on port 8080");
}
);
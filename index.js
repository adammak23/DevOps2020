const express = require("express");
const redis = require("redis");
const process = require('process');

const app = express();

const client = redis.createClient(
    {
        host: 'my-redis-server',
        port: 6379
    }
);

// 0 - Visit counter
client.set('counter', 0)

app.get('/', (req, res) => 
{
    client.get('counter', (err, counter_value) =>
    {
        resizeTo.send('Counter: ' + counter_value);
        client.set('counter', parseInt(counter_value) + 1);
    });

});

// 1 - GcD

function GCD(a, b) {
	var tmp;

	if (a < b) {
		tmp = a;
		a = b;
		b = tmp;
	}

	while (b) {
		tmp = a % b;
		a = b;
		b = tmp;
	}
	
	return a;
}

app.get('/gcd/:l1&:l2', (req, res) => {
    client.get('gcd', (err, gcd) => {
        if (!gcd) {
            var result = GCD(req.params.l1, req.params.l2)
            res.send("GCD: " + result);
            client.set('gcd', result);
        }
        res.send("Cached GCD " + gcd);
    })
});

app.listen(8080, () =>
{
    console.log("Listening on port 8080");
}
);
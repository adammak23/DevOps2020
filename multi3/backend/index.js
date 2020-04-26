const keys = require('./keys');

// Express App setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log(keys);

// Postgres client setup
const { Pool } = require('pg');
const pgClient = new Pool({
 user: keys.pgUser,
 host: keys.pgHost,
 database: keys.pgDatabase,
 password: keys.pgPassword,
 port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost PG database connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err));

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

const gcd = (num1, num2) => {
  if (num2 === 0) {
		return num1;
	}
  return gcd(num2, num1 % num2);
}

app.get('/nwd/:num1/:num2', (req, res) => {
  const num1 = req.params.num1;
  const num2 = req.params.num2;

  if(!num1 || !num2) {
    res.send("Please inser two numbers");
    return
  }

  const key = `${Math.min(num1, num2)}_${Math.max(num1, num2)}`;

	client.get(key, (err, value) => {
      if(!value) {
        value = gcd(num1, num2);
      }
		  res.send(`Greatest common divisor of ${num1} & ${num2} is ${value}`);
		  client.set(key, parseInt(value));
		});

});

app.get('/results', async (req, res) => {
  const result = await pgClient.query('SELECT * FROM values');
  res.send({gcd: result.rows})
});

const port = 5000;

app.listen(5000, err => {
  console.log(`Backend Listening ${port}`);
});

app.get('/', (req, res)=>
{
  res.send('Hello from backend!');
});

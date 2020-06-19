const express = require('express');
const redis = require('redis');
const process = require('process');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');

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

client.set(0, parseInt(0));
client.set(1, parseInt(1));

app.get('/deletethis', (req, res) => {
  

  const key = `${Math.min(num1, num2)}_${Math.max(num1, num2)}`;

  client.get(key, (err, value) => 
  {
    if(!value) 
    {
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


app.get('/droptable', (req, res)=>
{
  client.flushdb( function (err, succeeded) {
  console.log(succeeded);
  client.set(0, parseInt(0));
  client.set(1, parseInt(1));
});
});

//http://oeis.org/wiki/Lucky_numbers
app.get('/islucky/:num', (req, res)=>
{

  var num = parseInt(req.params.num);

  client.get(num, (err, value) =>
  {
    if(value) 
    {
      res.send({text:`${num} liczba z kolei w ciągu liczb szczęśliwych to: ${value}`, info: `Wczytane z Cache`});
    }
    else
    {
      let greatest_lucky = 1;

      //http://oeis.org/wiki/Density#Asymptotic_density
      let lucky = new Array(Math.ceil(num * (Math.log(((Math.log(num*10)*10)+1)*num)))+3).fill(0).map((v,i) => i+1);

      for (let i = 2; i < lucky.length;)
      {
        for (let j = i; j <= lucky.length; j+=i)
        {
          lucky[j-1] = 0;
        }

        //console.log(i, lucky.map(v => v));

        lucky = lucky.filter(v => v !== 0);
        i = lucky.find(v => v >= i + 1);
        greatest_lucky = i;
      }
      
      for (let k = 2; k <= num; k++)
      {
        client.get(k, (err, NextValue) => 
        {
          if(!NextValue) 
          {
            client.set(k, parseInt(lucky[k-1]));
            //console.log(k,lucky[k-1], ' setting');
            if(k == num) res.send({text:`${num} liczba z kolei w ciągu liczb szczęśliwych to: ${lucky[k-1]}`});
          }
          else
          {
            //console.log(k,lucky[k-1]);
          }
        });
      }
    }
  }
  );
}
);

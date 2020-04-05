const express = require("express");
const app = express();
app.get('/', (req, res) => 
{
    res.send("Hello from my web app aaaaaaaaaa");
}
);

app.listen(8080, () =>
{
    console.log("Listening on port 8080");
});
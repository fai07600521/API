const express = require("express");
const app = express();
const config = require('./config.json');
const data = [];
//middlewarewrapper
const cors = require('cors');
const MongodbConnect = require('./lib/mongo_connect');

const mongo = new MongodbConnect();

app.use(cors());
app.get("/get", function (req, res) {
  // console.log('get data');
  res.send(data);
});


app.get("/guru", (req, res) => {
  console.log("getin")
  if(!req.query.id) {
    return res.status(400).send('Missing URL parameter: id')
  }else{
    const result =   mongo.getresultbyID("guru",({
    id: req.query.id
  })
    .then(doc => {
      console.log(result);
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  
);



app.post('/add/guru', async (req, res) => {
  try {
    console.log('add data');
    req.body.id = await mongo.count('guru') + 1;
    const result = await mongo.postResult('guru', req.body);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(500).send(error.message);
  }

});


app.listen(config.port || 3003);
console.log("My Service is listening to port " + config.port)}})

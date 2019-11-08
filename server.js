const express = require("express");
const app = express();
const config = require('./config.json');
const data = [];
const bodyParser = require('body-parser');
//middlewarewrapper
const cors = require('cors');
const MongodbConnect = require('./lib/mongo_connect');
app.use(bodyParser.json());
const mongo = new MongodbConnect();

app.use(cors());

app.get("/", async (req, res) => {
  console.log("get guru")
  try{
    const result = await mongo.getallresult("thailand-sage");
    res.status(200).send(result);
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
});

app.get("/guru", async (req, res) => {
  console.log("getin")
  try{
    const { id } = req.query;
    const result = await mongo.getresultbyID("thailand-sage",{ id });
    res.status(200).send(result);
  }catch(err){
    res.status(400).send(err);
  }
});

app.post("/api/guru", async (req, res) => {
  try {
    console.log('add data');
    const body = {
      ...req.body, id: await mongo.count('thailand-sage') + 1.0,
      name: req.body.name,
      locationName: req.body.locationName,
      lacation: req.body.lacation,
      tel: req.body.tel
    }
    const result = await mongo.postResult('thailand-sage',body);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.send(500).send(error.message);
  }

});

app.put("/edit/guru/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await mongo.updateResult({ id: parseInt(id) }, "thailand-sage", req.body);   
    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

app.delete("/delete/guru/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await mongo.deleteResult("thailand-sage", parseInt(id));
    data.splice(req.body.id - 1, 1);
    res.send("delete success!");
  }catch(err){
    console.log(err.message);
    res.status(500).send(err.message);
}});

console.log("My Service is listening to port " + config.port),
app.listen(config.port || 3007);

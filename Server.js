/* Require express module
const express = require('express');
const app = express();

// Require mongodb
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ElancoGroupA:iVFPv7X5YGxP2mWN@elancoreceipts.4adsq.mongodb.net/<dbname>?retryWrites=true&w=majority';

// creates server on port 3000
app.listen(3000, function() {
  console.log('listening on 3000')
})


// Get request (endpoint , callback)
// fires when page reached ('/' = localgost:3000)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})*/

// Creates express server, listens for connections on port '80'

var express = require("express"),
  app = express(),
  http = require("http").Server(app).listen(80);

var path = require("path");

// Require mongodb
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ElancoGroupA:iVFPv7X5YGxP2mWN@elancoreceipts.4adsq.mongodb.net/<dbname>?retryWrites=true&w=majority';


var bodyParser = require('body-parser');

app.use(bodyParser());


MongoClient.connect(connectionString,{ useUnifiedTopology: true}, 
(err, client) => {

    if (err) return console.error(err)

    console.log('Connected to Database');

    const db = client.db('Test');
    const testCollection = db.collection('testCollection');

app.post('/quotes', (req, res) => {
  testCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
})



})

// middleware for uploading files
upload = require("express-fileupload");
app.use(upload());

console.log("Server started ");

// middleware to serve css, js and images
app.use(express.static("public"));

//make way for some custom css, js and images
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/images", express.static(__dirname + "/public/Images"));

// Get request serves a html page back to the browser
app.get("/",(req, res) => {
  res.sendFile(__dirname + "/addRecs.html");
});


app.post("/", function (req, res) {
 

  if (req.files) {
    var file = req.files.imgPath,
      filename = file.name;
    var fullFilepath = "../ElancoFrontend/public/receipts/" + filename;

    file.mv(fullFilepath, function (err) {
      if (err) {
        console.log(err);
        res.send("error occured");
      } else {

       
       const myModule = require("./public/js/callMe.js");

       res.redirect("../dataValidationPage.html");
        
      }
    });
  }
});


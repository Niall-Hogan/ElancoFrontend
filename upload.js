// Creates express server, listens for connections on port '80'
var express = require("express"),
  app = express(),
  http = require("http").Server(app).listen(80);

var path = require("path");

// Require mongodb
const mongoose = require('mongoose')
const url = 'mongodb+srv://ElancoGroupA:iVFPv7X5YGxP2mWN@elancoreceipts.4adsq.mongodb.net/<dbname>?retryWrites=true&w=majority';


var bodyParser = require('body-parser');

app.use(bodyParser());

mongoose.connect(url, { useNewUrlParser:true});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
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

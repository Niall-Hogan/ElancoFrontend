// Creates express server, listens for connections on port '80'
const express = require("express")
const app = express()
const http = require("http").Server(app).listen(80);
const path = require("path");

// require mongodb
const mongoose = require('mongoose')
const url = 'mongodb+srv://ElancoGroupA:iVFPv7X5YGxP2mWN@elancoreceipts.4adsq.mongodb.net/ElancoReceipts?retryWrites=true&w=majority';

// require ejs

const ejs = require('ejs');

/*// for parsing form data 
var bodyParser = require('body-parser');
app.use(bodyParser());*/

app.set('view engine','ejs');

// mongoose connection to atlas db ----------------
mongoose.connect(url, { useNewUrlParser:true});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
// ------------------------------------------------

// middleware for uploading files
upload = require("express-fileupload");
app.use(upload());

console.log("Server started ");

// middleware to serve css, js and images
app.use(express.static(__dirname + '/public'));

/*
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/images", express.static(__dirname + "/public/Images"));
*/
app.use("/views", express.static('/public/views'));

// Get request serves a html page back to the browser


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

            app.get("/",(req, res) => {

              res.render('index.ejs', {
                clinicName: clinicName,

              });


            });
       //res.redirect("../ElancoFrontend/public/views/index.ejs");
        
      }
    });
  }
});

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


console.log("Server started ");

// middleware for uploading files
upload = require("express-fileupload");
app.use(upload());
// middleware to serve css, js and images
app.use(express.static(__dirname + '/public'));


// Post request from addRecs
app.post("/", async function (req, res) {
 
  // if the file is found, save it to the reciepts folder
  if (req.files) {
    var file = req.files.imgPath,
      filename = file.name;
    var fullFilepath = "../ElancoFrontend/public/receipts/" + filename;

    file.mv(fullFilepath, async function (err) {
      if (err) {
        console.log(err);
        res.send("error occured");
      } else {

       const testFunction = require("./callMe");
       
       // result holds object that is returned from callMe test function
       const result = await testFunction()

        // renders (redirects) to the data validation page, passing the result object 
       res.render('index.ejs', result );
 
        
      }
    });
  }
});

 var path = require('path')
var express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(80);

    console.log("Server started ")


app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/Images'));


    app.get("/",function(req,res)
    {
        res.sendFile(__dirname+"/addRecs.html");
    })
var path = require('path')
var express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(80);

    upload = require("express-fileupload");
    app.use(upload())

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

    app.post("/",function(req,res)
    {
        if(req.files)
        {
            var file = req.files.imgPath,
            filename = file.name;

            file.mv("../ElancoFrontend/public/Images/"+filename, function(err)
            {
                if(err)
                {
                    console.log(err)
                    res.send("error occured")
                } else{
                    res.send("Done")
                }
            })
            //console.log(req.files);
        }
    })

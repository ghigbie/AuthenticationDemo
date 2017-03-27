var express = require("express");

var app = express();
app.set("view engine", "ejs");

//root route
app.get("/", function(req, res){
    res.render("home");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running : )");
});
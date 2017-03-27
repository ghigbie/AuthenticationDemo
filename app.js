var express = require("express");

var app = express();
app.set("view engine", "ejs");

//root route
app.get("/", function(req, res){
    res.render("home");
});

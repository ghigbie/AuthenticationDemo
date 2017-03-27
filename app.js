var express  = require("express"),
    mongoose = require("mongoose");

var app = express();
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");

//root route
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running : )");
});
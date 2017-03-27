const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      localStradtegy        = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose");
      
const User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");      

const app = express();    
app.set("view engine", "ejs");
app.use(passport.initialize()); //this line is needed for passport
app.use(passport.session()); //this line is needed for passport

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
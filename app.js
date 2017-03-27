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

app.use(require("express-session")({
    secret: "Rusty is the best dog ever",
    resave: false,
    saveUninitialized: false
}));

//these lines are needed to use passport
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============================================
//ROUTES
//==============================================

//root route
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.get("*", function(req, res){
    res.render("notfound");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running : )");
});
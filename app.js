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

app.user(bodyParser.urlencoded({extended: true}))
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

//AUTH ROUTES

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log("SOMETHING WENT WRONG WITH USER REGISTRATION (POST /register");
            console.log(err);
            res.render("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});


app.get("*", function(req, res){
    res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running : )");
});
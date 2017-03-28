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

app.use(bodyParser.urlencoded({extended: true}))
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

//show login form
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    
});


app.get("*", function(req, res){
    res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running : )");
});
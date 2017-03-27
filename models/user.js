const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");
      
var UserSchema = mongoose.Schema({
    useranme: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
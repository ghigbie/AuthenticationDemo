const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    useranme: String,
    password: String
});


module.exports = mongoose.model("User", userSchema);
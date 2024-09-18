const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the User

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: "String",
    password: { type: String, required: true },
   

}, { Timestamp: true });
module.exports = mongoose.model("user", UserSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the User

const ProfileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Foreign key reference to User
        ref: 'User',
        required: true
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },

    profileType: {
        type: String, //work or personal or ...
        required: true
    },


}, { Timestamp: true });
module.exports = mongoose.model("profile", ProfileSchema);

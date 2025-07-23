const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

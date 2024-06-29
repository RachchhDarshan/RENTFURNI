const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user'], required: true }, // Ensure role is required and enumerated
    token: { type: String },
    otp: { type: String, default: null }
});

module.exports = mongoose.model('User', UserSchema);

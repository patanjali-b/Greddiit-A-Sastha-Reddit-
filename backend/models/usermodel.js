const mongoose = require('mongoose');
const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    contact: {type: String, required: true},
    age: {type: String, required: true},
    password: {type: String, required: true},
    followers: {type: Array, required: true},
    following: {type: Array, required: true},
}, 
{collection: 'user-data'}
)
const model = mongoose.model('User', User);

module.exports = model;
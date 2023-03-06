const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Description:{type: String, required: true},
    Author: {type: String, required: true},
    PostID : {type: String, required: true},
}
)
const model = mongoose.model('Post', PostSchema);
module.exports = model;
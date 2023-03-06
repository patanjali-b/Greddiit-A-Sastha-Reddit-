const mongoose = require('mongoose');
const SubGredditSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Description:{type: String, required: true},
    Tags:[
        {type: String}
    ],
    Banned:[
        {type: String}
    ],
    ID: {type: String},
    }
)
const model = mongoose.model('SubGreddit', SubGredditSchema);
module.exports = model; 
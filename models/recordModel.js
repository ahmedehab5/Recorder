const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    index : Number,
    text : String,
    order : String,
    name : String,
    command : String,
    audio : Buffer
});

module.exports = mongoose.model('Record', recordSchema);
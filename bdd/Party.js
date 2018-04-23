const mongoose = require('mongoose');
const partyShema = new mongoose.Schema({
    name: String,
    score: Number,
}, { bufferCommands: false });
module.exports = mongoose.model('Party', partyShema);
const mongoose = require('mongoose');

const CommitySchema = new mongoose.Schema({
    email :String,
    password: String
})

const CommityModel = mongoose.model('Commity_members', CommitySchema);

module.exports = CommityModel;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    hash: {type: String, required: true},
    
    preferredTopics: { type: Array, required: true},
    preferredSources: Array, 
});


module.exports = mongoose.model('User', userSchema);
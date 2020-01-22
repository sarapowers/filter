const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestSchema = new Schema({
    user_id: {type: String, required: true},
    topics: {type: Array, required: true},
    sources: Array,
})

modeule.exports = mongoose.model('Interests', interestSchema);
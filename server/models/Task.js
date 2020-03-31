const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Task', TaskSchema);
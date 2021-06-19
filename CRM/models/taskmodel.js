const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title : { type: String, trim: true },
    description : { type: String, trim: true },
});

module.exports = mongoose.model('task', TaskSchema)
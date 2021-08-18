const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const bcrypt = require('bcrypt');

// Define collection and schema
let Assignment = new Schema({
    subject: {
       type: String
    },
    assignmentNo: {
        type: Number
    },
    description: {
       type: String,
       default: null
    },
    dueDate: {
       type: Date
    },
    dueTime: {
        type: String
    },
    done: {
       type: Boolean,
       default: false
    },
    progress: {
       type: Number
    }
 
 }, {
    collection: 'Assignments'
 })

 module.exports = mongoose.model('Assignment', Assignment)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const bcrypt = require('bcrypt');

// Define collection and schema
let Reminder = new Schema({
    title: {
       type: String
    },
    description: {
       type: String,
       default: null
    },
    dueDate: {
       type: Date,
       default: null
    },
    done: {
       type: Boolean,
       default: false
    }

 }, {
    collection: 'Reminders'
 })

 module.exports = mongoose.model('Reminder', Reminder)
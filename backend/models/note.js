const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const bcrypt = require('bcrypt');

// Define collection and schema
let Note = new Schema({
   title: {
      type: String
   },
   description: {
      type: String
   },
   date: {
      type: Date
   },
   userId: {
      type:Schema.ObjectId,
      ref:"userId",
      default:null
   }
 
 }, {
    collection: 'Notes'
 })

 module.exports = mongoose.model('Note', Note)
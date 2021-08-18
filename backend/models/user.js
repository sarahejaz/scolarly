const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const bcrypt = require('bcrypt');


// Define collection and schema
let User = new Schema({
   username: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true
   },
   password:{
      type:String
   },
   displayName: {
       type: String
   }

}, {
   collection: 'Users'
})


User.methods.isValid = function(password) {
   //console.log(this.password,password) ;
if(password==this.password)
return true;
else return false;
   // return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

module.exports = mongoose.model('User', User)
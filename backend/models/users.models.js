const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name : {
    type : String,
    required : true,
    trim : true
  },
  email : {
    type : String,
    required :  true,
    unique : true,
    trim : true
  },
  password : {
    type : String,
    required : true
  },
  role : {
    type : String,
    enum : ['user' , 'admin'],
    default : 'user'
  }
},
{
  timestamps : true
});


userSchema.pre("save" , async function (next) {
  let hashedPassword = await bcrypt.hash(this.password , 10);
  this.password = hashedPassword;
});

userSchema.methods.passwordMatch = async function(password) {
   return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User" , userSchema);

module.exports = User;


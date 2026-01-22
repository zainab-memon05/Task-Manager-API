const mongoose = require('mongoose');
const { Schema } = mongoose;

const subTaskSchema = new Schema({
  title : {
    type : String,
  },
  description : {
    type : String
  },
  status : {
    type : String,
    enum : ["pending" , "in_progress" , "completed"],
  },
  priority : {
    type : String,
    enum : ["low" , "medium" , "high"],
  },
  dueDate : {
    type : Date
  },
  attachment : {
    type : String
  },
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
} , {
  timestamps : true

});

const subTask = mongoose.model("subTask" , subTaskSchema);

module.exports = subTask;
const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskSchema = new Schema({
  title : {
    type : String,
    required : true,
  },
  description : {
    type : String
  },
  status : {
    type : String,
    enum : ["pending" , "in_progress" , "completed"],
    required : true
  },
  priority : {
    type : String,
    enum : ["low" , "medium" , "high"],
    required : true
  },
  dueDate : {
    type : Date,
    required : true
  },
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
} , {
  timestamps : true
});


const Task = mongoose.model("Task" , taskSchema);

module.exports = Task;

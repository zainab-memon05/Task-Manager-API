const subTask = require("../models/subTasks.models");
const Task = require("../models/tasks.models");



module.exports.createSubTasks = async (req,res) => {
  if (!req.user) {
      return res.status(401).send("User not found");
    }
  
    const {id} = req.params;
    const subtask = new subTask({
      ...req.body,
      user : req.user.id
    });
    const task = await Task.findById(id);
    task.subtasks.push(subtask);
    await task.save();
    await subtask.save();
    res.json({ message : "Sub Task created"});
}


module.exports.getsubTask = async (req, res) => {
    if (!req.user) {
      return res.status(403).send("Not authorized owners");
    }
    
    const subtask = await subTask.find({});


    if (req.user.id !== subtask[0].user.toString()) {
      return res.status(403).send("Not the Authorized User");
    }
    res.json({subtask});
  };


  module.exports.subTaskUpdate = async (req, res) => {
    if (!req.user) {
      return res.status(403).send("Not authorized owners");
    }

    const {id , subTaskId} = req.params;

    let subtask = await subTask.findById(subTaskId);

    if (req.user.id !== subtask.user.toString()) {
      return res.status(403).send("Not the Authorized User");
    }
    let updSubTask = await subTask.findByIdAndUpdate(subTaskId, { ...req.body } , {new : true})
    res.json({updSubTask});

    

    if(updSubTask.status === "completed" && subtask.status !== "completed"){

      await completionEmail(updSubTask);
      
   }
  };


module.exports.subTaskDelete = async (req, res) => {
    if (!req.user) {
      return res.status(403).send("Not the Authorized User");
    }
    const { id , subTaskId} = req.params;
    const subtask = await subTask.findById(subTaskId);
    if(req.user.id !== subtask.user.toString()){
      return res.status(403).send("Not the Authorized User");
    }

    await subTask.findByIdAndDelete(subTaskId);
    res.json({ message : "subTask Deleted Successfully"});
  }
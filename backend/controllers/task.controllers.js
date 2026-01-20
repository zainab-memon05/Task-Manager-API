const Task = require('../models/tasks.models.js');
const ExpressError = require('../utils/expressError.js');
const User = require('../models/users.models.js');
const mail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const path = require('path');
const { completionEmail } = require('../utils/email.js');


module.exports.createTasks = async (req, res) => {
    if (!req.user) {
      return res.status(401).send("User not found");
    }

    let task = new Task({
      ...req.body.task,
      user: req.user.id,
    });
    await task.save();
    res.json({ message : "Task created"});
  };


module.exports.Filters = async (req, res) => {
    if (!req.user) {
      return res.status(401).send("User not found");
    }

    let filter = {
      user : req.user.id
    }

    //searching

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    // status
    if (req.query.status) {
     filter.status = req.query.status;
    }

    // priority

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    //from date and due date range

   if (req.query.fromDate || req.query.toDate) {
      filter.dueDate = {};
      if (req.query.fromDate) {
        filter.dueDate.$gte = new Date(req.query.fromDate);
      }
      if (req.query.toDate) {
        filter.dueDate.$lte = new Date(req.query.toDate);
      }
    }

    // pagination

     const page = Number(req.query.page) || 1;
     const limit = Number(req.query.limit) || 10;
     const skip = (page - 1) * limit;


    // sortBy
    
    let sort = {};

      if (req.query.sortBy) {
      const order = req.query.order === "asc" ? 1 : -1;
      sort[req.query.sortBy] = order;
     }  

    const total = await Task.countDocuments(filter);

    const totalPages = Math.ceil(total/limit);

     let tasks = await Task.find(filter)
     .sort(sort)
     .skip(skip)
     .limit(limit);
  
     res.json({tasks ,
      meta : {
        total ,
        totalPages ,
        page,
        limit,
        hasPrev : page > 1,
        hasNext : page < totalPages
      },
     });
  };


module.exports.getSingleTask = async (req, res) => {
    if (!req.user) {
      return res.status(403).send("Not authorized owners");
    }
    const { id } = req.params;
    let task = await Task.findById(id);
    if (req.user.id !== task.user.toString()) {
      return res.status(403).send("Not the Authorized User");
    }
    res.json({task});
  };


module.exports.updateTask = async (req, res) => {
    if (!req.user) {
      return res.status(403).send("Not authorized owners");
    }
    const { id } = req.params;
    let task = await Task.findById(id);
    if (req.user.id !== task.user.toString()) {
      return res.status(403).send("Not the Authorized User");
    }
    let updTask = await Task.findByIdAndUpdate(id, { ...req.body.task } , {new : true}).populate('user' , 'name , email');
    console.log(`updated task : ${updTask}`);
    res.json({updTask});

    

    if(updTask.status === "completed" && task.status !== "completed"){

      await completionEmail(updTask);
      
   }
  };


module.exports.deleteTask = async (req, res) => {
    if (!req.user) {
      return res.status(403).send("Not the Authorized User");
    }
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message : "Task Deleted Successfully"});
  }

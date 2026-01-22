const Joi = require("joi");


module.exports.userSchema = Joi.object({
  user : Joi.object({
    name : Joi.string().min(3).max(100).trim().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).max(20).required()
  }).required()
});


module.exports.taskSchema = Joi.object({
  task : Joi.object({
    title : Joi.string().required().min(3).max(50),
    description : Joi.string().max(100).optional(),
    status : Joi.string().valid("pending" , "in_progress" , "completed").required(),
    priority : Joi.string().valid("low" , "medium" , "high").required(),
    dueDate : Joi.date().min('now').required(),
    attachment : Joi.string().optional()
  }).required()
});

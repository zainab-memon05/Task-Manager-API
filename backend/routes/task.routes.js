const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controllers.js');
const {jwtMiddleware , taskValidation} = require('../middleware/middleware.js');
const wrapAsync = require('../utils/wrapAsync.js');
const upload = require('../utils/uploads.js');


router.post('/' , jwtMiddleware , upload.single('task[attachment]') ,taskValidation , wrapAsync(taskController.createTasks));

router.get('/' , jwtMiddleware , wrapAsync(taskController.Filters));

router.get('/:id', jwtMiddleware , wrapAsync(taskController.getSingleTask));

router.put('/:id' , jwtMiddleware , wrapAsync(taskController.updateTask));

router.delete('/:id' , jwtMiddleware , wrapAsync(taskController.deleteTask));

module.exports = router;
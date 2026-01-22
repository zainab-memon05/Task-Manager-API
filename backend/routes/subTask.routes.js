const express = require('express');
const { jwtMiddleware } = require('../middleware/middleware');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router({mergeParams : true});
const subTaskController = require('../controllers/subTask.controllers.js');

router.post('/' , jwtMiddleware , wrapAsync(subTaskController.createSubTasks));

router.get('/' , jwtMiddleware , wrapAsync(subTaskController.getsubTask));

router.put('/:subTaskId' , jwtMiddleware , wrapAsync(subTaskController.subTaskUpdate));

router.delete('/:subTaskId' , jwtMiddleware , wrapAsync(subTaskController.subTaskDelete));
module.exports = router;
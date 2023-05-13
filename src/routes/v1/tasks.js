const expresss = require('express');

const { getTaskId, getTaskWhere, newTask, updateTask, deleteTask } = require('../../controllers/tasksControllers');

const router = expresss.Router();

router
  .get('/', getTaskWhere)

  .get('/:taskId', getTaskId)

  .post('/new', newTask)

  .patch('/:taskId', updateTask)

  .delete('/:taskId', deleteTask);

module.exports = router;

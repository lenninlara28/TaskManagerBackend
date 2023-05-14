const TasksServices = require('../services/tasks');

const getTaskWhere = async (req, res, next) => {
  const tasksServices = new TasksServices();

  try {
    const where = req.body;

    const task = await tasksServices.getTaskWhere(where);

    res.status(200).json({
      task,
      message: task ? 'Tareas encontradas' : 'No se encontraron tareas',
    });
  } catch (error) {
    next(error);
  }
};

const getTaskId = async (req, res, next) => {
  const tasksServices = new TasksServices();
  const { taskId } = req.params;
  try {
    const task = await tasksServices.getTaskId(taskId);
    res.status(200).json({
      task,
      message: task ? 'Tarea encontrada' : 'No se encontro la tarea',
    });
  } catch (error) {
    next(error);
  }
};

const newTask = async (req, res, next) => {
  const tasksServices = new TasksServices();
  const { taskData } = req.body;
  try {
    if (!taskData) {
      throw new Error('No se encontro la tarea');
    }
    if (!taskData.descripcion || taskData.descripcion === '') {
      throw new Error('La descripcion no puede estar vacia');
    }
    if (!taskData.id_usuarios || taskData.id_usuarios === '') {
      throw new Error('El id del usuario no puede estar vacio');
    }
    const task = await tasksServices.newTask(taskData);
    res.status(201).json({
      task,
      message: 'Tarea creada',
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const tasksServices = new TasksServices();
  const { taskId } = req.params;
  const { taskData } = req.body;
  try {
    if (!taskData) {
      throw new Error('No se encontro la tarea');
    }
    if (!taskData.descripcion || taskData.descripcion === '') {
      throw new Error('La descripcion no puede estar vacia');
    }
    if (!taskData.id_usuarios || taskData.id_usuarios === '') {
      throw new Error('El id del usuario no puede estar vacio');
    }

    const validTask = await tasksServices.getTaskId(taskId);

    if (!validTask) {
      throw new Error('No se encontro la tarea');
    }

    const task = await tasksServices.updateTask(taskId, taskData);

    res.status(200).json({
      task,
      message: 'Tarea actualizada',
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const tasksServices = new TasksServices();
  const { taskId } = req.params;

  try {
    const validTask = await tasksServices.getTaskId(taskId);

    if (!validTask) {
      throw new Error('No se encontro la tarea');
    }

    const task = await tasksServices.deleteTask(taskId);

    res.status(200).json({
      task,
      message: 'Tarea exlimminada',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTaskWhere, getTaskId, newTask, updateTask, deleteTask };

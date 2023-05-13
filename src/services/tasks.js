const { sequelize, Tareas: taskModel, Usuarios: userModel, Cuentas: accountModel } = require('../lib/sequelize/models');

class TasksService {
  async getTaskWhere(where) {
    const tasks = await taskModel.findAll({
      where: {
        ...where,
      },
    });
    return tasks;
  }

  async getTaskId(id) {
    const tasks = await taskModel.findOne({
      where: {
        id,
        estado: 1,
      },
    });
    return tasks;
  }

  async newTask(dataTask, transaction = null) {
    const t = transaction || (await sequelize.transaction());
    try {
      const { id } = await taskModel.create(dataTask, { transaction: t });

      if (!transaction) await t.commit();
      return id;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }

  async updateTask(id, dataTask, transaction = null) {
    const t = transaction || (await sequelize.transaction());
    try {
      const taks = await taskModel.update(dataTask, { where: { id } }, { transaction: t });

      if (!transaction) await t.commit();
      return taks.id;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }

  async deleteTask(id, transaction = null) {
    const t = transaction || (await sequelize.transaction());
    try {
      const taks = await taskModel.update({ estado: -1 }, { where: { id } }, { transaction: t });

      if (!transaction) await t.commit();
      return taks.id;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }
}

module.exports = TasksService;

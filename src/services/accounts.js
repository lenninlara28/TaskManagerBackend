const bcrypt = require('bcrypt');
const { sequelize, Cuentas: accountModel } = require('../lib/sequelize/models');

class AccountService {
  async getAccountWhere(where) {
    const user = await accountModel.findOne({
      where: {
        ...where,
      },
    });
    return user;
  }

  async createAccount(data, transaction = null) {
    const t = transaction || (await sequelize.transaction());

    try {
      const passwordHash = await bcrypt.hash(data.password, 10);
      const { id } = await accountModel.create(
        {
          ...data,
          password: passwordHash,
        },
        { transaction: t }
      );

      if (!transaction) await t.commit();

      return id;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }

  async login(data) {
    const user = await accountModel.findOne({
      where: { estado: 1, correo: data.correo },
    });
    return user;
  }

  async updateAccount(data, accountId, transaction = null) {
    const t = transaction || (await sequelize.transaction());

    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      await accountModel.update(
        { ...data },
        {
          where: {
            id: accountId,
          },
          transaction: t,
        }
      );
      if (!transaction) await t.commit();

      return accountId;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(`No se pudo actualizar la cuenta: ${error.message}`);
    }
  }
}

module.exports = AccountService;

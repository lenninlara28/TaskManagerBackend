const { sequelize, Usuarios: userModel, Cuentas: accountModel } = require('../lib/sequelize/models');
const AccountService = require('./accounts');
const { config } = require('../config');

class UserService {
  async getUserId(id) {
    const user = await userModel.findOne({
      where: {
        id,
        estado: 1,
      },
      include: [
        {
          model: accountModel,
          as: 'cuentas',
          attributes: ['id', 'correo'],
          where: { estado: 1 },
        },
      ],
    });

    return user;
  }

  async createUser(userData, accountData, transaction = null) {
    const accountService = new AccountService();
    const t = transaction || (await sequelize.transaction());

    try {
      const account = await accountService.getAccountWhere({ estado: 1, correo: accountData.correo });
      if (!account) {
        const { id: userId } = await userModel.create(userData, { transaction: t });
        const accountId = await accountService.createAccount(
          {
            ...accountData,
            id_usuarios: userId,
          },
          t
        );

        if (!transaction) await t.commit();
        return { userId, accountId };
      }

      return [null, null];
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }

  async signUp(data, transaction = null) {
    const t = transaction || (await sequelize.transaction());
    const accountService = new AccountService();

    try {
      const account = await accountService.getAccountWhere({ correo: data.correo });

      if (account && account.estado === true) {
        throw new Error('Ya existe un usuario con ese correo');
      }

      if (account && (!account.estado || account.estado === -1)) {
        /* Si existía ya una cuenta pero estaba desactivada */
        await this.updateUser(
          {
            primer_nombre: data.primer_nombre,
            segundo_nombre: data.segundo_nombre,
            primer_apellido: data.primer_apellido,
            segundo_apellido: data.segundo_apellido,
            estado: 1,
          },
          account.id_usuarios,
          t
        );
        await accountService.updateAccount(
          {
            password: data.password,
            estado: 1,
          },
          account.id,
          t
        );
      } else {
        /* si no existe una cuenta */
        await this.createUser(
          {
            primer_nombre: data.primer_nombre,
            segundo_nombre: data.segundo_nombre,
            primer_apellido: data.primer_apellido,
            segundo_apellido: data.segundo_apellido,
            id_grupos_usuarios: 3,
          },
          {
            correo: data.correo,
            password: data.password,
            estado: 1,
          },
          t
        );
      }

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }

  async updateUser(userData, userId, transaction = null) {
    const accountService = new AccountService();
    const t = transaction || (await sequelize.transaction());

    try {
      await userModel.update(userData, {
        where: {
          id: userId,
        },
        transaction: t,
      });

      if (userData.password && userData.password.length > 0) {
        await accountService.updateAccount({ password: userData.password }, userData.cuentas[0].id, t);
      }

      if (!transaction) await t.commit();

      return userId;
    } catch (error) {
      if (!transaction) await t.rollback();
      throw new Error(error);
    }
  }
}

module.exports = UserService;

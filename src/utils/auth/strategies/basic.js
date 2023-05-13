const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AccountService = require('../../../services/accounts');

passport.use(
  new BasicStrategy(async function (correo, password, cb) {
    const accountService = new AccountService();

    try {
      const user = await accountService.login({ correo });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.dataValues.password;

      return cb(null, user.dataValues);
    } catch (error) {
      return cb(error);
    }
  })
);

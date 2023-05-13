const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const AccountService = require('../../../services/accounts');
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const accountService = new AccountService();

      try {
        const user = await accountService.getAccount(tokenPayload.sub);

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.dataValues.password;

        cb(null, { ...user.dataValues });
      } catch (error) {
        return cb(error);
      }
    }
  )
);

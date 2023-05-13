const passport = require('passport');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { config } = require('../config');
const UserService = require('../services/users');

// Basic strategy
require('../utils/auth/strategies/basic');

const getUserId = async (req, res, next) => {
  const { userId } = req.params;
  const userService = new UserService();

  try {
    const user = await userService.getUserId(userId);

    res.status(200).json({
      user,
      message: user ? 'Usuario encontrado' : 'No se encontró ningún usuario con ese ID',
    });
  } catch (err) {
    next(err);
  }
};

const singUp = async (req, res, next) => {
  const { body: data } = req;
  const userService = new UserService();

  try {
    const userId = await userService.signUp(data);

    res.status(201).json({
      message: userId ? 'Usuario creado' : 'No se pudo crear el usuario',
    });
  } catch (error) {
    next(error);
  }
};

const singIn = async (req, res, next) => {
  passport.authenticate('basic', function (error, user) {
    try {
      if (error || !user) {
        return next(boom.unauthorized());
      }

      return req.login(user, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        const { id, correo, id_usuarios } = user;

        const payload = {
          sub: id,
          subUser: id_usuarios,
          correo,
        };

        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '90d',
        });

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          sameSite: 'none',
          path: '/;sameSite=None;Secure;HttpOnly',
        });

        res.status(200).json({ id, correo });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

module.exports = { getUserId, singUp, singIn };

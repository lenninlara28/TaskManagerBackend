require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3030,
  originCors: process.env.ORIGIN_CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  sequelizeLogging: process.env.SQ_LOGGING.toLowerCase() === 'true',
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };

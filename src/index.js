const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();
const { config } = require('./config/index');
const { errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errorHandler');
const v1UserApi = require('./routes/v1/users');
const v1TasksApi = require('./routes/v1/tasks');

app.use(
  cors({
    origin: [config.originCors],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.use('/api/v1/users', v1UserApi);
app.use('/api/v1/tasks', v1TasksApi);

app.listen(config.port, function () {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});

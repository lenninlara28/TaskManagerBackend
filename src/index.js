const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const { config } = require('./config/index');
const { errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errorHandler');
const v1UserApi = require('./routes/v1/users');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.use('/api/v1/users', v1UserApi);

app.listen(config.port, function () {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});

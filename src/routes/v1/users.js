const expresss = require('express');

const { getUserId, singUp, singIn } = require('../../controllers/usersControllers');

const router = expresss.Router();

router
  .get('/:userId', getUserId)

  .post('/sign-up', singUp)

  .post('/sign-in', singIn);

module.exports = router;

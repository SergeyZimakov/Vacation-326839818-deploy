const apiRouter = require('express').Router();

apiRouter.use('/users', require('../server/users/usersRouter'));
apiRouter.use('/vacations', require('../server/vacations/vacationsRouter'));
apiRouter.use('/follows', require('../server/follows/followsRouter'));

module.exports = apiRouter;


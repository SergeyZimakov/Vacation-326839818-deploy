const followsRouter = require('express').Router();
const followsRepository = require('../follows/followsRepository');
const webSocketsHandler = require('../utils/webSocketsHandler');

followsRouter.post('/', async (req, res) => {
    const {userId, vacationId} = req.body;
    const addedFollow = await followsRepository.addFollow({userId, vacationId});
    if(addedFollow) {
        res.status(200).send({data: `Follow id ${addedFollow} added successfully`});
        webSocketsHandler.updateData();
    }
    else {
        res.status(401).send({error: ['Some error occured. Contact service please']});
    }
})


followsRouter.delete('/unfollow/', async (req,res) => {
    const {userId, vacationId} = req.body;
    const removedFollow = await followsRepository.unFollow(userId, vacationId);
    if(removedFollow) {
        res.status(200).send({data: `Follow was removed successfully`});
        webSocketsHandler.updateData();
    }
    else {
        res.status(401).send({error: ['Some error occured. Contact service please']});
    }
})

followsRouter.delete('/vacation/:vacationId', async (req,res) => {
    const vacationId = req.params.vacationId;
    const removedFollow = await followsRepository.deleteFollowByVacationId(vacationId);
    if(removedFollow) {
        res.status(200).send({data: `Follow was removed successfully`});
    }
    else {
        res.status(401).send({error: ['Some error occured. Contact service please']});
    }
})

module.exports = followsRouter;
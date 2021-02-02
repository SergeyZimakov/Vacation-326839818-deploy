const vacationsRouter = require('express').Router();
const vacationsValidator = require('./vacationsValidator');
const vacationsRepository = require('../vacations/vacationsRepository');
const followsRepository = require('../follows/followsRepository');
const dateConvertor = require('../utils/dateConvertor');
const upload = require('../utils/uploadConf');
const webSocketsHandler = require('../utils/webSocketsHandler');


vacationsRouter.get('/', async (req, res) => {
    const user = req.session.user;
    const followedVacations = await vacationsRepository.findFollowedVacations(user.id);
    const vacations = await vacationsRepository.findUnFollowedVacations(user.id);
    if (vacations.length === 0 && followedVacations.length === 0) {
        res.status(301).send({error: ['No vacations found']});
    }
    else {
        for (let i = 0; i < followedVacations.length; i++) {
            const v = followedVacations[i];
            const follows = await followsRepository.getAmountOfFollowsByVacationId(v.id);
            v.follows = follows;
            v.FromDate = dateConvertor.convertor(v.FromDate);
            v.ToDate = dateConvertor.convertor(v.ToDate);           
        }
        for (let i = 0; i < vacations.length; i++) {
            const v = vacations[i];
            const follows = await followsRepository.getAmountOfFollowsByVacationId(v.id);
            v.follows = follows;
            v.FromDate = dateConvertor.convertor(v.FromDate);
            v.ToDate = dateConvertor.convertor(v.ToDate);           
        }
        res.status(200).send({data: {followedVacations, vacations}});
    }
})


vacationsRouter.post('/',  upload.single("image"), async (req, res) => {
    const {destination, description, price, FromDate, ToDate} = req.body;
    const newVacationData = {destination, description, price, FromDate, ToDate, image: req.file.filename};
    const validatedData = vacationsValidator.validator(newVacationData);
    if (validatedData.errors) {
        res.status(400).send({error: validatedData.errors})
    }
    else {
        delete validatedData.errors;
        const addedVacation = await vacationsRepository.addVacation(validatedData);
        if(addedVacation) {
            res.status(200).send({data: `Vacation id ${addedVacation} added successfully`})
            webSocketsHandler.updateData();
        }
        else {
            res.status(401).send({error: ['Some error occured. Contact service please']})
        }
    }
});

//edit
vacationsRouter.post('/:id', async (req, res) => {
    const id = req.params.id;
    const {destination, description, price, FromDate, ToDate} = req.body;
    const dataToEdit = {destination, description, price, FromDate, ToDate};
    const affectedRows = await vacationsRepository.editVacationById(id, dataToEdit);
    if(affectedRows) {
        res.status(200).send({data: `${affectedRows} rows in vacation id ${id} was updated successfully`})
        webSocketsHandler.updateData();
    }
    else {
        res.status(401).send({error: ['Some error occured. Contact service please']})
    }
});

vacationsRouter.delete('/delete/:vacationId', async (req, res) => {
    const id = req.params.vacationId;
    const removedFollow = await followsRepository.deleteFollowByVacationId(id);
    const removedVacation = await vacationsRepository.removeVacationById(id);
    if(removedVacation) {
        res.status(200).send({data: `Vacation was removed successfully`})
        webSocketsHandler.updateData();
    }
    else {
        res.status(401).send({error: ['Some error occured. Contact service please']})
    }
})

module.exports = vacationsRouter;
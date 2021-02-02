const usersRouter = require('express').Router()
const bcrypt = require('bcrypt');
const usersRepository = require('../users/usersRepository');
const usersValidator = require('../users/usersValidator');
const followsRepository = require('../follows/followsRepository');


usersRouter.post('/login', async (req, res) => {
    const {userName, password} = req.body;
    const user = await usersRepository.findByUserName(userName);
    if (!user) {
        res.status(401).send({error: ['The user does not exist']});
    }
    else {
        await bcrypt.compare(password, user.password, async (err, match) => {
            if (err) {
                res.status(401).send({error: ['Log in error. Contact support']});
            }
            else {
                if (match) {
                    req.session.user = user;
                    res.cookie('userId', user.id);
                    delete user.password;
                    res.status(200).send({data: user});
                }
                else {
                    res.status(401).send({error: ['Bad password']});
                }
            }
        })
    }
});

usersRouter.post('/logout', (req, res) => {
    if(req.session && req.session.user) {
        req.session.user = null;
        res.status(200).send({data: 'User logged out'})
    }
    else {
        res.status(400).send({error: ['User was not autorized']})
    }
})

usersRouter.post('/register', async (req, res) => {
    const { firstName, secondName, userName, password } = req.body;
    const newUser = await usersValidator.validator({ firstName, secondName, userName, password });
    if (newUser.errors) {
        res.status(400).send({error: newUser.errors})
    }
    else {
        delete newUser.errors;
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;
        const registeredUser = await usersRepository.addUser(newUser);
        if (!registeredUser) {
            res.status(401).send({error: ['Some error']});
        }
        else {
            res.status(200).send({data: `User with id: ${registeredUser} successfully registered`});
        }
    }
});

module.exports = usersRouter;
const usersRepository = require('../users/usersRepository'); 

const validator = async newUser => {
    let errors = [];
    const users = await usersRepository.findAll();
    const {firstName, secondName, userName, password} = newUser;
    if (!firstName) {
        errors.push('First Name is missing');
    }
    if (!secondName) {
        errors.push('Second Name is missing');
    }
    if (!userName) {
        errors.push('User Name is missing');
    }
    if (!password) {
        errors.push('Password is missing');
    }
    users.forEach(user => { 
        if (user.userName === userName) {
            errors.push('User already exist');
        }
    });

    if (errors.length === 0) {
        errors = null;
    }

    const role = users.length > 0 ? 'user' : 'admin';

    return { firstName, secondName, userName, password, role, errors };
}

module.exports = {validator};
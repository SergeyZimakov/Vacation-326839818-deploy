const dataBase = require('../utils/dataBaseService');

class UsersRepository {
    async findAll() {
        return dataBase.sqlRequest('SELECT * FROM users');
    }
    async findByUserName(userName) {
        const results = await dataBase.sqlRequest('SELECT * FROM users WHERE userName = ?', [userName]);
        return !results || results.length === 0 ? null : results[0];
    }
    async addUser(newUserData) {
        const registeredUser = await dataBase.sqlRequest('INSERT INTO users SET ?', newUserData);
        return registeredUser.insertId;
    }
}


const usersRepository = new UsersRepository;

module.exports = usersRepository;
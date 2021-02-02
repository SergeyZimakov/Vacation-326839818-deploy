const dataBase = require('../utils/dataBaseService');

class FollowsRepository {
    async findAll() {
        return dataBase.sqlRequest('SELECT * FROM follows');
    }
    async findFollowedVacationsByUserId(userId) {
        const results = await dataBase.sqlRequest('SELECT vacationId FROM follows WHERE userId = ?', [userId]);
        console.log(results);
        return !results || results.length === 0 ? null : results;
    }

    async getAmountOfFollowsByVacationId(vacationId) {
        const results = await dataBase.sqlRequest('SELECT COUNT(*) AS follows FROM follows WHERE vacationId = ?', [vacationId]);
        return !results || results.length === 0 ? null : results[0].follows;
    }

    async unFollow(userId, vacationId) {
        const removedFollow = await dataBase.sqlRequest('DELETE FROM follows WHERE userId = ? AND vacationId = ?', [userId, vacationId]);
        return removedFollow;
    }

    async deleteFollowByVacationId(vacationId) {
        const removedFollow = await dataBase.sqlRequest('DELETE FROM follows WHERE vacationId = ?', [vacationId]);
        return removedFollow;
    }

    async addFollow(newFollow) {
        const addedFollow = await dataBase.sqlRequest('INSERT INTO follows SET ?', newFollow);
        return addedFollow.insertId;
    }
}


const followsRepository = new FollowsRepository;

module.exports = followsRepository;
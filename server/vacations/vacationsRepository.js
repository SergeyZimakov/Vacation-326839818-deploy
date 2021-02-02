const dataBase = require('../utils/dataBaseService');

class VacationsRepository {
    async findAll() {
        return dataBase.sqlRequest('SELECT * FROM vacations');
    }

    async findFollowedVacations(userId) {
        return dataBase.sqlRequest(`SELECT * FROM vacations WHERE id IN (SELECT vacationId FROM follows WHERE userId = ${userId})`);
    }

    async findUnFollowedVacations(userId) {
        return dataBase.sqlRequest(`SELECT * FROM vacations WHERE id NOT IN (SELECT vacationId FROM follows WHERE userId = ${userId})`);
    }
    async findById(id) {
        const results = await dataBase.sqlRequest('SELECT * FROM vacations WHERE id = ?', [id]);
        return !results || results.length === 0 ? null : results[0];
    }

    async removeVacationById(vacationId) {
        const removedVacation = await dataBase.sqlRequest('DELETE FROM vacations WHERE id = ?', [vacationId]);
        return removedVacation.affectedRows;
    }

    async addVacation(newVacationData) {
        const addedVacation = await dataBase.sqlRequest('INSERT INTO vacations SET ?', newVacationData);
        return addedVacation.insertId;
    }

    async editVacationById(id, data) {
        const editedVacation = await dataBase.sqlRequest('UPDATE vacations SET ? WHERE id = ?', [data, id]);
        return editedVacation.affectedRows;
    }
}


const vacationsRepository = new VacationsRepository;

module.exports = vacationsRepository;
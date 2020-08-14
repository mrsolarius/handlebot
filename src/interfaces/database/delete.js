const db = require('../../util/PostgresHelper');
const User = require('../../models/User')

module.exports = {
    /**
     * Permet de surprimer un utilisateur de la BDD à partire de sont id discord
     * @param {String} discordID
     * @return {Promise<void>}
     */
    async unset(discordID){
        await db.query(`
            Delete FROM USERS
            WHERE "discordID" = $1`,[discordID]);

    }
}
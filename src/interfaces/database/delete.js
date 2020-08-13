const db = require('../../util/PostgresHelper');

module.exports = {
    /**
     * Permet de surprimer un utilisateur de la BDD à partire de sont id discord
     * @param {String} discordID
     * @return {Promise<void>}
     */
    async unset(discordID){
        let data = await db.query(`
            Delete FROM USERS 
            WHERE "discordID" = $1`,[discordID]);
        console.log(data)
    }
}
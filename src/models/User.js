const select = require('../interfaces/database/select')
const scapi = require("../interfaces/restAPI/scAPI");

class User {

    constructor() {
        this.discordID = null
        this.country =null
        this.region = null
        this.organizationSID = null
        this.organizationRank = null
        this.bio = null
        this.lang = []
    }
    /**
     * On tente de récupérer un utilisateur depuis sont id discord
     * @param {String} discordID
     * @return User
     */
    static async tryGetUserFromDiscord(discordID){
        if (await select.isRegisterFromDiscordID(discordID)){
            return await select.getUserFromDiscordID(discordID)
        }
    }

    /**
     * On tente de récupérer un utilisateur depuis sont handle
     * @param {String} handle
     */
    static async tryGetUserFromHandle(handle){
        let returnUser = new User()
        if (await select.isRegisterFromHandle(handle)){
            return await select.getUserFromHandle(handle)
        }else {
            returnUser = await scapi.getUser(handle)
            if(returnUser){
                return returnUser
            }
        }
    }


}

module.exports = User
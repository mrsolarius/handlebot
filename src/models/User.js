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
     * @param {boolean} forceAPI
     */
    static async tryGetUserFromHandle(handle,forceAPI = false){
        let returnUser = new User()
        if (forceAPI||!await select.isRegisterFromHandle(handle)){
            returnUser = await scapi.getUser(handle)
            if(returnUser){
                return returnUser
            }
        }else {
            return await select.getUserFromHandle(handle)
        }
    }
}

module.exports = User
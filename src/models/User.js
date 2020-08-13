const select = require('../interfaces/database/select')
const scapi = require("../interfaces/restAPI/scAPI");

class User {

    constructor() {
        this.discordID = null
        this.country =null
        this.region = null
        this.organisationSID = null
        this.organisationRank = null
        this.bio = null
        this.lang = []
    }
    /**
     * On tente de récupérer un utilisateur depuis sont id discord
     * @param {String} discordID
     * @return User
     */
    static async tryGetUserFromDiscord(discordID){
        console.log(discordID)
        let returnUser = new User()
        let userData
        if (await select.isRegisterFromDiscordID(discordID)){
            userData = await select.getUserFromDiscordID(discordID)
            returnUser = userData
            returnUser.lang = await select.getUserLangFromDiscordID(discordID)
            return returnUser
        }
    }

    /**
     * On tente de récupérer un utilisateur depuis sont handle
     * @param {String} handle
     */
    static async tryGetUserFromHandle(handle){
        let returnUser = new User()
        let userData
        console.log(await select.isRegisterFromHandle(handle))
        if (await select.isRegisterFromHandle(handle)){
            userData = await select.getUserFromHandle(handle)
            returnUser = userData
            returnUser.lang = await select.getUserLangFromHandle(handle)
            return returnUser
        }else {
            userData = await scapi.getUser(handle)
            if(userData){
                returnUser.userID = parseInt(userData.profile.id.replace('#',''))
                returnUser.handle = userData.profile.handle
                returnUser.displayName = userData.profile.display
                returnUser.enlisted = userData.profile.enlisted
                returnUser.avatarURL = userData.profile.image
                returnUser.badge = userData.profile.badge
                returnUser.badgeImage = userData.profile.badge_image
                returnUser.bio = userData.profile.bio
                returnUser.pageTitle = userData.profile.page.title
                returnUser.pageLink = userData.profile.page.url
                returnUser.website = userData.profile.website
                returnUser.lang = userData.profile.fluency

                if(userData.profile.location){
                    returnUser.country = userData.profile.location
                    returnUser.region = userData.profile.region
                }
                if (userData.organization) {
                    returnUser.organizationSID = userData.organization.sid
                    returnUser.organizationRank = userData.organization.rank
                }

                return returnUser
            }
        }
    }


}

module.exports = User
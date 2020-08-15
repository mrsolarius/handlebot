const get = require('../../util/xhrRequest')
const log = require("../../util/logger");
const User = require('../../models/User')

module.exports = {
    /**
     * Permet de récupérer un objet user depuis le handle
     * @param handle
     * @return {Promise<User|void|*>}
     */
    async getUser(handle) {
        try {
            let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/live/user/${handle}`)
            apiJSON = JSON.parse(apiJSON)
            if (apiJSON.data.profile){
                let returnUser = new User.constructor()
                returnUser.userID = parseInt(apiJSON.data.profile.id.replace('#',''))
                returnUser.handle = apiJSON.data.profile.handle
                returnUser.displayName = apiJSON.data.profile.display
                returnUser.enlisted = apiJSON.data.profile.enlisted
                returnUser.avatarURL = apiJSON.data.profile.image
                returnUser.badge = apiJSON.data.profile.badge
                returnUser.badgeImage = apiJSON.data.profile.badge_image
                returnUser.bio = apiJSON.data.profile.bio
                returnUser.pageTitle = apiJSON.data.profile.page.title
                returnUser.pageLink = apiJSON.data.profile.page.url
                returnUser.website = apiJSON.data.profile.website
                returnUser.lang = apiJSON.data.profile.fluency

                if(apiJSON.data.profile.location){
                    returnUser.country = apiJSON.data.profile.location.coutry
                    returnUser.region = apiJSON.data.profile.location.region
                }
                if (apiJSON.data.organization) {
                    returnUser.organizationSID = apiJSON.data.organization.sid
                    returnUser.organizationRank = apiJSON.data.organization.rank
                }
                return returnUser
            }else {
                return log.warn('Le handle n\'existe pas')
            }
        } catch (e) {
            return e
        }
    },
    async getOrganization(organizationSID){
        try {
            let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/live/organization/${organizationSID}`)
            apiJSON = JSON.parse(apiJSON)
            if (apiJSON.data.sid){
                return apiJSON.data
            }else {
                return log.warn('Le handle n\'existe pas')
            }
        } catch (e) {
            return e
        }
    }
}
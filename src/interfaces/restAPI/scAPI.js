const get = require('../../util/xhrRequest')
const log = require("../../util/logger");
//const User = require('../../models/User')
//const Organization = require('../../models/Organization')

module.exports = {
    /**
     * Permet de récupérer un objet user depuis le handle
     * @param handle
     * @return {Promise<User|void|*>}
     */
    async getUser(handle) {
        try {
            let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/eager/user/${handle}`)
            apiJSON = JSON.parse(apiJSON)
            if (apiJSON.data.profile){
                let returnUser = {}
                returnUser.userID = parseInt(apiJSON.data.profile.id.replace('#',''))
                returnUser.discordID = null
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
                log.warn('Le handle n\'existe pas')
                return null
            }
        } catch (e) {
            console.log(e)
            return e
        }
    },
    /**
     * Permet de récupérer une organisation depuis sont SID
     * @param organizationSID
     * @return {Promise<void|Organization>}
     */
    async getOrganization(organizationSID){
        try {
            let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/eager/organization/${organizationSID}`)
            apiJSON = JSON.parse(apiJSON)
            if (apiJSON.data.sid){
                let returnOrganization = {}
                returnOrganization.organizationSID = apiJSON.data.sid
                returnOrganization.name = apiJSON.data.name
                returnOrganization.logo = apiJSON.data.logo
                returnOrganization.memberCount = apiJSON.data.members
                returnOrganization.recruiting = apiJSON.data.recruiting
                returnOrganization.archetype = apiJSON.data.archetype
                returnOrganization.commitment = apiJSON.data.commitment
                returnOrganization.roleplay = apiJSON.data.roleplay
                returnOrganization.primaryFocus = apiJSON.data.focus.primary.name
                returnOrganization.primaryImage = apiJSON.data.focus.primary.image
                returnOrganization.secondaryFocus = apiJSON.data.focus.secondary.name
                returnOrganization.secondaryImage = apiJSON.data.focus.secondary.image
                returnOrganization.banner = apiJSON.data.banner
                returnOrganization.headline = apiJSON.data.headline.plaintext
                returnOrganization.lang = apiJSON.data.lang
                return returnOrganization
            }else {
                log.warn('Le handle n\'existe pas')
                return null
            }
        } catch (e) {
            return e
        }
    },
    async getStarCitizenStats(){
        try {
            let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/eager/stats/`)
            apiJSON = JSON.parse(apiJSON)
            if(apiJSON.data){
                return apiJSON.data
            }else {
                return log.warn('une ereur et survenue lors de la récupération des donnée de la scapi sur getStarCitizenStats')
            }
        } catch (e) {
            return e
        }
    }
}
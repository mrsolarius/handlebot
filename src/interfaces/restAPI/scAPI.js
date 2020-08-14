const get = require('../../util/xhrRequest')
const log = require("../../util/logger");

module.exports = {
    async getUser(handle) {
        try {
            let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/live/user/${handle}`)
            apiJSON = JSON.parse(apiJSON)
            if (apiJSON.data.profile){
                return apiJSON.data
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
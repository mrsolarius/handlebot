const select = require('../interfaces/database/select')
const scapi = require("../interfaces/restAPI/scAPI");

class Organization {

    static async tryGetOrganizationFromSID(organizationSID){
        let returnOrganization = new Organization()
        let organizationData
        if (await select.isOrganizationRegisterFromSID(organizationSID)){
            organizationData = await select.getOrganizationFromSID(organizationSID)
            returnOrganization = organizationData
            return returnOrganization
        }else{
            organizationData = await scapi.getOrganization(organizationSID)
            console.log(organizationData)
            if (organizationData){
                returnOrganization.organizationSID = organizationData.sid
                returnOrganization.name = organizationData.name
                returnOrganization.logo = organizationData.logo
                returnOrganization.memberCount = organizationData.members
                returnOrganization.recruiting = organizationData.recruiting
                returnOrganization.archetype = organizationData.archetype
                returnOrganization.commitment = organizationData.commitment
                returnOrganization.roleplay = organizationData.roleplay
                returnOrganization.primaryFocus = organizationData.focus.primary.name
                returnOrganization.primaryImage = organizationData.focus.primary.image
                returnOrganization.secondaryFocus = organizationData.focus.secondary.name
                returnOrganization.secondaryImage = organizationData.focus.secondary.image
                returnOrganization.banner = organizationData.banner
                returnOrganization.headline = organizationData.headline.plaintext
                returnOrganization.lang = organizationData.lang
                return returnOrganization
            }
        }
    }
}

module.exports = Organization
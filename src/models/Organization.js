const scapi = require("../interfaces/restAPI/scAPI")
const select = require("../interfaces/database/select");


class Organization {

    constructor() {
        this.lang = null
    }
    /**
     * Permet de tenter la récupération d'une organisation depuis sont sid
     * @param organizationSID
     * @return {Promise<Organization|void>}
     */
    static async tryGetOrganizationFromSID(organizationSID){
        console.log(scapi)
        console.log(select)
        if (await select.isOrganizationRegisterFromSID(organizationSID)){
            return await select.getOrganizationFromSID(organizationSID)
        }else{
            let organizationData = await scapi.getOrganization(organizationSID)
            if (organizationData){
                return organizationData
            }
        }
    }
}

module.exports = Organization
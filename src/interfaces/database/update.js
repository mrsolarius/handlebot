const select = require('./select')
const insert = require('./insert')
const scAPI = require('../restAPI/scAPI')
const db = require('../../utils/PostgresHelper');
const User = require('../../models/User');

module.exports = {
    /**
     * Mise à jour de l'utilisateur dans la base de donnée depuis l'objeet User
     * @param {User}user
     * @return {Promise<void>}
     */
    async updateUser(user){
        if (!await select.isRegisterFromHandle(user.handle)) return
        if (!await select.isOrganizationRegisterFromSID(user.organizationSID)) {
            await insert.insertOrganisation(await scAPI.getOrganization(user.organizationSID))
        }
        await db.query(`
                    Update users
                    set
                        "displayName" = $1,
                        "organizationSID"=$2,
                        "organizationRank"=$3,
                        enlisted = $4,
                        "avatarURL" = $5,
                        badge = $6,
                        "badgeImage" = $7,
                        bio = $8,
                        "pageTitle" = $9,
                        "pageLink" = $10,
                        country = $11,
                        region = $12,
                        website = $13
                        where "userID" = $14`,
            [
                user.displayName,
                user.organizationSID,
                user.organizationRank,
                user.enlisted,
                user.avatarURL,
                user.badge,
                user.badgeImage,
                user.bio,
                user.pageTitle,
                user.pageLink,
                user.country,
                user.region,
                user.website,
                user.userID,
            ]
        )
        await this.updateUserLang(user)
    },
    /**
     * Mise à jour/ajout des langue d'un utilisateur depuis l'objet user
     * @param {User} user
     * @return {Promise<void>}
     */
    async updateUserLang(user){
        // récupération du tableau d'id des lang
        let langID = await select.getLangIDs(user.lang)
        let langData = []
        let strReturn = ""
        let i1 = 0, i2;
        for (let i = 0; i < langID.length; i++) {
            i1 = i1 + 1
            i2 = i1 + 1
            //génération de autant de $ d'isertion que n'asaisaire
            strReturn += `($${i1},$${i2}),`
            i1 = i2
            //ajout des donnée dans le tableau dans l'ordre demander par la requette
            langData.push(user.userID)
            langData.push(langID[i])
        }
        strReturn = strReturn.substr(0, strReturn.length - 1);
        //insertion des langue parlers
        await db.query(`delete from speak where "userID" =$1`,[user.userID])
        await db.query(`
                    Insert into speak
                    ("userID", "langID")
                    values ${strReturn}`, langData
        )
    }
}
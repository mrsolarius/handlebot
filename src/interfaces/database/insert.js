const db = require('../../util/PostgresHelper')
const select = require('./../database/select')
const Organization = require('../../models/Organization')
const User = require('../../models/User')

module.exports = {
    /**
     * Requette d'insertion d'un organization à partir de l'objet organisation
     * @param {Organization} organization
     * @return {Promise<void>}
     */
    async insertOrganisation(organization){
        let lang = await select.getLangIDs([organization.lang])
        await db.query(`
            Insert into organizations 
            ("organizationSID","langID", name, logo, "memberCount", recruiting, archetype, commitment, roleplay, "primaryFocus", "primaryImage", "secondaryFocus", "secondaryImage", banner, headline)
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
            [
                organization.organizationSID,
                lang[0],
                organization.name,
                organization.logo,
                organization.memberCount,
                organization.recruiting,
                organization.archetype,
                organization.commitment,
                organization.roleplay,
                organization.primaryFocus,
                organization.primaryImage,
                organization.secondaryFocus,
                organization.secondaryImage,
                organization.banner,
                organization.headline
            ]
        );
    },
    /**
     * Requette d'insertion d'un utilisateur et de ces langue parler à partir de l'objet utilisateur
     * @param {User} user
     * @return {Promise<void>}
     */
    async insertUser(user) {
        await db.query(`
                    Insert into users
                    ("userID", "discordID", handle, "displayName", "organizationSID", "organizationRank", enlisted, "avatarURL",
                     badge, "badgeImage", bio, "pageTitle", "pageLink", country, region, website)
                    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
            [
                user.userID,
                user.discordID,
                user.handle,
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
                user.website
            ]
        );
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
        await db.query(`
                    Insert into speak
                    ("userID", "langID")
                    values ${strReturn}`, langData
        )
     }
}
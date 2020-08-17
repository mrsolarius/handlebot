const db = require('../../util/PostgresHelper')
const select = require('./select')
const update = require('./update')
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
        )
        await update.updateUserLang(user)
     }
}
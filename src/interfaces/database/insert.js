const db = require('../../utils/PostgresHelper')
const select = require('./select')
const update = require('./update')
const Organization = require('../../models/Organization')
const User = require('../../models/User')

async function insertManufacture(ship){
    await db.query(`
    Insert into manufacture ("manufacturerCode", name, description, "knownFor", "logoURL")
    VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT ("manufacturerCode") Do update 
    set "manufacturerCode"=$1,name=$2,description=$3,"knownFor"=$4,"logoURL"=$5`,
[ship.manufacture.manufacturerCode,ship.manufacture.name,ship.manufacture.description,ship.manufacture.knownFor,ship.manufacture.logoURL])
}

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
     },
    async insertShip(ship){
        await insertManufacture(ship)
        await db.query(`
            INSERT INTO ship (slug, "manufacturerCode", name, type, focus, description, beam, height, length, mass, size, "cargoCapacity", "maxCrew", "minCrew", "afterBurnerSpeed", "scmSpeed", "pitchMax", "yawMax", "rollMax", "xAxisAcceleration", "yAxisAcceleration", "zAxisAcceleration", price, "inGamePrice", "productionStatus", "componentJson", "lastModified", url, "fleetChartImage", "bannerImage") 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30)
            ON CONFLICT (slug) DO UPDATE
            SET slug = $1,"manufacturerCode" = $2, name=$3, type=$4, focus=$5, description=$6, beam=$7, height=$8, length=$9, mass=$10, size=$11, "cargoCapacity"=$12, "maxCrew"=$13, "minCrew"=$14, "afterBurnerSpeed"=$15, "scmSpeed"=$16, "pitchMax"=$17, "yawMax"=$18, "rollMax"=$19, "xAxisAcceleration"=$20, "yAxisAcceleration"=$21, "zAxisAcceleration"=$22, price=$23, "inGamePrice"=$24, "productionStatus"=$25, "componentJson"=$26, "lastModified"=$27, url=$28, "fleetChartImage"=$29, "bannerImage"=$30`,
            [ship.slug,ship.manufacturerCode,ship.name,ship.type,ship.focus,ship.description,ship.beam,ship.height,ship.length,ship.mass,ship.size,ship.cargoCapacity,ship.maxCrew,ship.minCrew,ship.afterBurnerSpeed,ship.scmSpeed,ship.pitchMax,ship.yawMax,ship.rollMax,ship.xAxisAcceleration,ship.yAxisAcceleration,ship.zAxisAcceleration,ship.price,ship.inGamePrice,ship.productionStatus,ship.componentJson,ship.lastModified,ship.url,ship.fleetChartImage,ship.bannerImage])
    }
}
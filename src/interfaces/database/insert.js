const db = require('../../utils/PostgresHelper')
const select = require('./select')
const update = require('./update')
const Organization = require('../../models/Organization')
const User = require('../../models/User')
const {getAffiliation} = require("./select");

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
    },
    async insertPrefix(serveurID,prefix){
        await db.query(`
            INSERT INTO server ("guildID",prefix)
            values ($1,$2)
            ON CONFLICT ("guildID") DO UPDATE 
            SET "guildID"=$1,prefix=$2`,
            [serveurID,prefix]
        )
    },
    async insertLang(serveurID,langID){
        await db.query(`
            INSERT INTO server ("guildID","langID")
            values ($1,$2)
            ON CONFLICT ("guildID") DO UPDATE 
            SET "guildID"=$1,"langID"=$2`,
            [serveurID,langID]
        )
    },
    /**
     *
     * @param {Affiliation} affiliation
     * @returns {Promise<void>}
     */
    async insertUpdateAffiliation(affiliation){
        await db.query(`
            INSERT INTO affiliations ("codeAffiliation", "colorAffiliation", name) 
            VALUES ($1,$2,$3)
            ON CONFLICT ("codeAffiliation") DO UPDATE
            SET "codeAffiliation" = $1,"colorAffiliation" = $2, name=$3`,
            [affiliation.codeAffiliation,affiliation.colorAffiliation,affiliation.name])
    },
    /**
     *
     * @param {Star}star
     * @returns {Promise<void>}
     */
    async insertUpdateStar(star){
        if (!await getAffiliation(star.affiliation.codeAffiliation))
            await insertUpdateAffiliation(star.affiliation)
        else
            await db.query(`INSERT INTO stars ("starCode", "codeAffiliation", description, "aggregatedDanger", "aggregatedEconomy", "aggregatedSize", "frostLine", "habitableZoneInner", "habitableZoneOuter", "infoUrl", "positionX", "positionY", "positionZ", "imgURL", type, status,"aggregatedPopulation") 
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
            ON CONFLICT ("codeAffiliation") DO UPDATE SET "starCode"=$1,"codeAffiliation"=$2,description=$3,"aggregatedDanger"=$4,"aggregatedEconomy"=$5,"aggregatedSize"=$6,"frostLine"=$7,"habitableZoneInner"=$8,"habitableZoneOuter"=$9,"infoUrl"=$10,"positionX"=$11,"positionY"=$12,"positionZ"=$13,"imgURL"=$14,type=$15,status=$16, "aggregatedPopulation" = $17`,
            [star.starCode,star.affiliation.codeAffiliation,star.description,star.aggregatedDanger,star.aggregatedEconomy,star.aggregatedSize,star.frostLine,star.habitableZoneInner,star.habitableZoneOuter,star.infoUrl,star.positionX,star.positionY,star.positionZ,star.imgURL,star.type,star.status])
    },
    /**
     *
     * @param {Type} type
     * @returns {Promise<void>}
     */
    async insertUpdateType(type){
        await db.query(`Insert into types ("typeCode","nomType")
            values ($1,$2)
            on conflict ("typeCode") do update set "typeCode" = $1, "nomType" = $2`,
            [type.typeCode,type.nomType])

    },
    /**
     *
     * @param {SubType}subType
     * @returns {Promise<void>}
     */
    async insertUpdateSubType(subType){
        await insertUpdateType(subType.type)
        await db.query(`INSERT INTO subtype ("subTypeID", "typeCode", "nomSubType")
            values ($1,$2,$3)
            on conflict ("subTypeID") do update set  "subTypeID"= $1,"typeCode"=$2,"nomSubType"=$3`,
            [subType.subTypeID,subType.type.typeCode,subType.nomSubType])
    },
    /**
     *
     * @param {StarMapObject}starMapObject
     * @returns {Promise<void>}
     */
    async insertUpdateStarMapObject(starMapObject){
        if (!await getStars(starMapObject.star.code)){
            await insertUpdateStar(starMapObject.star)
        }
        if (!await getType(starMapObject.type.typeCode)){
            await insertUpdateAffiliation(starMapObject.type)
        }
        await getType(starMapObject.type.typeCode)
        await db.query(`Insert Into starmapobjects ("starCode", "typeCode", "objCode", appearance, "subType", "axialTilt", name, description, designation, distance, "fairChanceAct", habitable, "infoURL", lat, long, "orbitPeriod", "sensorDanger", "sensorEconomy", "sensorPopulation", size, "imgURL") 
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
            on CONFLICT ("starCode","typeCode","objCode") do update set appearance=$4,"subType"=$5,"axialTilt"=$6,name=$7,description=$8,designation=$9,distance=$10,"fairChanceAct"=$11,"habitable"=$12,"infoURL"=$13,lat=$14,long=$15,"orbitPeriod"=$16,"sensorDanger"=$17,"sensorEconomy"=$18,"sensorPopulation"=$19,size=$20,"imgURL"=$21`,
            [starMapObject.star.starCode,starMapObject.type.typeCode,starMapObject.objCode,starMapObject.appearance,starMapObject.axialTilt,starMapObject.name,starMapObject.description,starMapObject.designation,starMapObject.distance,starMapObject.fairChanceAct,starMapObject.habitable,starMapObject.infoURL,starMapObject.lat,starMapObject.long,starMapObject.orbitPeriod,starMapObject.sensorDanger,starMapObject.sensorEconomy,starMapObject.sensorPopulation,starMapObject.size,starMapObject.infoURL])
    },
    /**
     *
     * @param {StarMapObject} starMapObjectParent
     * @param {StarMapObject} starMapObjectChild
     * @returns {Promise<void>}
     */
    async insertChildObject(starMapObjectParent, starMapObjectChild){
        await db.query(`insert into objectchild ("parentStarCode", "parentTypeCode", "parentObjCode", "childStarCode", "childTypeCode", "childObjCode") 
            values ($1,$2,$3,$4,$5,$6)
            on CONFLICT ("parentStarCode", "parentTypeCode", "parentObjCode", "childStarCode", "childTypeCode", "childObjCode") do nothing `,
            [starMapObjectParent.star.starCode,starMapObjectParent.type.typeCode,starMapObjectParent.objCode,starMapObjectChild.star.starCode,starMapObjectChild.type.typeCode,starMapObjectChild.objCode])

    },
    /**
     *
     * @param {JumpPointLink} jumpPointLink
     * @returns {Promise<void>}
     */
    async insertJumpPointLink(jumpPointLink){
        await db.query(`insert into jumppointlinks ("entryStarCode", "entryTypeCode", "entryObjCode", "exitStarCode", "exitTypeCode", "exitObjCode", name, direction, size) 
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            on CONFLICT ("entryStarCode", "entryTypeCode", "entryObjCode", "exitStarCode", "exitTypeCode", "exitObjCode") do nothing `,
            [jumpPointLink.entryStarMapObject.star.starCode,jumpPointLink.entryStarMapObject.type.typeCode,jumpPointLink.entryStarMapObject.objCode,jumpPointLink.exitStarMapObject.star.starCode,jumpPointLink.exitStarMapObject.type.typeCode,jumpPointLink.exitStarMapObject.objCode,jumpPointLink.name,jumpPointLink.direction,jumpPointLink.size])
    }
}
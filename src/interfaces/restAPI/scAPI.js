const get = require('../../utils/xhrRequest')
const log = require("../../utils/logger");
const Affiliation = require("../../models/starMap/Affiliation");
const SubType = require("../../models/starMap/SubType");
const Star = require("../../models/starMap/Star");
const Type = require("../../models/starMap/Type");
const StarMapObject = require("../../models/starMap/StarMapObject");
const JumpPointLink = require("../../models/starMap/JumpPointLink");
//const User = require('../../models/User')
//const Organization = require('../../models/Organization')

/**
 * Permet de rechercher des vaisseau grasse à une liste de crithére prédéfinie
 * @param {String} classification
 * @param {number} lengthMin
 * @param {number} lengthMax
 * @param {number} crewMin
 * @param {number} crewMax
 * @param {number} page
 * @return {Promise<void|*>}
 */
async function searchShipAtPage(classification,lengthMin,lengthMax,crewMin,crewMax,page){
    try {
        let url = `https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/auto/ships?classification=${classification}&length_min=${lengthMin}&length_max=${lengthMax}&crew_min=${crewMin}&crew_max=${crewMax}&page=${page}&max_page=6`
        let apiJSON = await get(url)
        apiJSON = JSON.parse(apiJSON)
        if(apiJSON.data){
            return apiJSON.data
        }else {
            log.warn('une ereur et survenue lors de la récupération des donnée de la scapi sur searchShip')
            return null
        }
    } catch (e) {
        return e
    }
}

async function starMapObjectAPIConverterToOBJ(apiObject){
    const {insertUpdateStar,insertUpdateType,insertUpdateSubType} = require("../database/insert");// bas oui c'est normal de mettre les import ici PT1
    const {getStar,getType,getSubType} = require("../database/select"); //VRAIMENT LE JS ME SAOUL POUR CETTE CHOSE !!!!!!
    const key = apiObject.code.split('.')
    let star = await getStar(key[0])
    let type = await getType(key[1])
    let subType = null
    apiObject.subtype?
        subType = await getSubType(apiObject.subtype.id)
        :null

    if (!star){
        star = await getStar(key[0])
    }
    if (!type){
        type = new Type.build(key[1],apiObject.type)
        await insertUpdateType(type)
    }
    if (!subType && subType!== null){
        subType = new SubType.build(type,apiObject.subtype.id,apiObject.subtype.name)
        await insertUpdateSubType(subType)
    }
    let childrenArray = []
    if (apiObject.children){
        for(const item of apiObject.children){
            childrenArray.push(await starMapObjectAPIConverterToOBJ(item))
        }
    }
    let thumbnail = apiObject.texture?
        apiObject.texture.source
        :null
    return new StarMapObject.build(
        star,
        type,
        subType,
        key[key.length-1],
        apiObject.appearance,
        apiObject.axialTilt,
        apiObject.name,
        apiObject.description,
        apiObject.designation,
        apiObject.distance,
        apiObject.fairchanceact,
        apiObject.habitable,
        apiObject.info_url,
        apiObject.lat,
        apiObject.long,
        apiObject.orbit_period,
        apiObject.sensor_danger,
        apiObject.senesor_economy,
        apiObject.sensor_population,
        apiObject.size,
        thumbnail,
        childrenArray)
}

function starAPIConverterToOBJ(item){
    let affiliation = new Affiliation.build(item.affiliation[0].code,item.affiliation[0].color,item.affiliation[0].name)
    let thumbnail = item.thumbnail?
        item.thumbnail.source
        :null
    return new Star.build(
        item.code,
        affiliation,
        item.description,
        item.aggregated_danger,
        item.aggregated_economy,
        item.aggregated_economy,
        item.frost_line,
        item.aggregated_size,
        item.habitable_zone_inner,
        item.habitable_zone_outer,
        item.info_url,
        item.position_x,
        item.position_y,
        item.position_x,
        thumbnail,
        item.type,
        item.status)
}

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
    /**
     * Récupéree les stats de sc depuis l'api
     * @return {Promise<void|*>}
     */
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
    },
    async searchShip(classification,lengthMin,lengthMax,crewMin,crewMax){
        let i = 1
        let search
        let pagesArray = new Array(0)
        do {
            search = await searchShipAtPage(classification, lengthMin, lengthMax, crewMin, crewMax, i)
            pagesArray.push(search)
            i = i+1
        } while (search.length!==0)
        pagesArray.pop()
        return pagesArray
    },
    async getShip(name){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/ships/?name=${name}`)
        apiJSON = JSON.parse(apiJSON)
        if(apiJSON.data)
            return apiJSON.data[0]
    },
    async getAllShip(){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/ships?json_path=$[*]`)
        apiJSON = JSON.parse(apiJSON)
        if(apiJSON.data)
            return apiJSON.data
    },
    /**
     *
     * @returns {Promise<Array<Affiliation>>}
     */
    async getAffiliations(){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/starmap/affiliations`)
        apiJSON = JSON.parse(apiJSON)
        let affiliations = []
        for (const item of apiJSON.data) {
            affiliations.push(new Affiliation.build(item.code,item.color,item.name))
        }
        return affiliations
    },
    /**
     *
     * @param code
     * @return {Promise<Star>}
     */
    async getStar(code){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/starmap/star-system?json_path=$[?(code="${code}")]`)
        apiJSON = JSON.parse(apiJSON)
        return starAPIConverterToOBJ(apiJSON.data)
    },
    /**
     *
     * @returns {Promise<Array<Star>>}
     */
    async getStars(){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/starmap/star-system?json_path=$[*]`)
        apiJSON = JSON.parse(apiJSON)
        let StarSystems = []
        for (const item of apiJSON.data){
            StarSystems.push(starAPIConverterToOBJ(item));
        }
        return StarSystems
    },
    /**
     * @return {Promise<Array<StarMapObject>>}
     */
    async getStarMapObjects(){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/starmap/object?json_path=$[*]`)
        apiJSON = JSON.parse(apiJSON)
        let starMapObjects = []
        for (let SMO of apiJSON.data){
            starMapObjects.push(await starMapObjectAPIConverterToOBJ(SMO))
        }
        return starMapObjects
    },
    async getStarMapObject(fullCode){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/starmap/object?json_path=$[?(@.code="${fullCode}")]`)
        apiJSON = JSON.parse(apiJSON)
        return await starMapObjectAPIConverterToOBJ(apiJSON.data)
    },
    /**
     *
     * @return {Promise<Array<JumpPointLink>>}
     */
    async getJumpPointLinks(){
        let apiJSON = await get(`https://api.starcitizen-api.com/${process.env.APIKEY_SC}/v1/cache/starmap/tunnels`)
        apiJSON = JSON.parse(apiJSON)
        let jumpPointLinks = []
        for (const tunnel of apiJSON.data) {
            const entryStarMapOBJ = await this.getStarMapObject(tunnel.entry.code)
            const exitStarMapOBJ = await this.getStarMapObject(tunnel.exit.code)
            jumpPointLinks.push(new JumpPointLink.build(entryStarMapOBJ,exitStarMapOBJ,tunnel.name,tunnel.direction,tunnel.size))
        }
        return jumpPointLinks
    }
}
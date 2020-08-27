const log = require("../../utils/logger");
const db = require("../../utils/PostgresHelper");
//const User = require("../../models/User");
//const Organization = require("../../models/Organization")

module.exports = {
    /**
     * Requette de selection d'un utilisateur par sont id discord
     * @param {String} discordID
     * @return {Promise<*|HTMLTableRowElement|string>}
     */
    async getUserFromDiscordID(discordID){
        let returnUser = {}
        let data = await db.query(`
            SELECT * 
            FROM USERS 
            FULL OUTER JOIN organizations on organizations."organizationSID" = users."organizationSID"
            WHERE "discordID" = $1`,[discordID]);
        returnUser = data.rows[0]
        returnUser.lang = await this.getUserLangFromUserID(returnUser.userID)
        return returnUser
    },
    /**
     * Requete de selection d'un membre par son handle
     * @param {String} handle
     * @return {Promise<User>}
     */
    async getUserFromHandle(handle){
        let returnUser = {}
        let data = await db.query(`
            SELECT * 
            FROM USERS 
            FULL OUTER JOIN organizations on organizations."organizationSID" = users."organizationSID"
            WHERE lower(handle) = lower($1)`,[handle]);
        returnUser = data.rows[0]
        returnUser.lang = await this.getUserLangFromUserID(returnUser.userID)
        return returnUser
    },
    /**
     * Requet permettant de verifier si un utilisateur et présent dans la BDD par sont iddiscord
     * @param {String} discordID
     * @return {Promise<boolean>}
     */
    async isRegisterFromDiscordID(discordID){
        let data = await db.query(`
            SELECT count(*) 
            FROM USERS 
            WHERE "discordID" = $1`,[discordID]);
        let count = parseInt(data.rows[0].count,10)
        if (count===0){
            return false
        }else if(count===1){
            return true
        }else {
            return log.warn('Un iddiscord est enregistrer plus de une fois dans la BDD ce n\'est normalement pas possible')
        }
    },
    /**
     * Requet permettant de verifier si un utilisateur et présent dans la BDD par sont iddiscord
     * @param {String} handle
     * @return {Promise<boolean>}
     */
    async isRegisterFromHandle(handle){
        let data = await db.query(`
            SELECT count(*) 
            FROM USERS 
            WHERE lower(handle) = lower($1)`,[handle]);
        let count = parseInt(data.rows[0].count,10)
        if (count===0){
            return false
        }else if(count===1){
            return true
        }else {
            return log.warn('Un handle est enregistrer plus de une fois dans la BDD ce n\'est normalement pas possible')
        }
    },
    /**
     * Renvoie les lang parler par un utilisateur depuis sont id
     * @param  {String} UserID
     * @return {Promise<[String]>}
     */
    async getUserLangFromUserID(UserID){
        let data = await db.query(`
            select lang from speak
            inner join lang ON lang."langISO" = speak."langID"
            where speak."userID" = $1`,[UserID]);

        let returnedLang = []
        for(let lang of data.rows){
            returnedLang.push(lang.lang)
        }
        return returnedLang
    },
    /**
     * Requet permettant de verifier qu'une organisation se trouve dans la BDD
     * @param {String} organizationSID
     * @return {Promise<boolean>}
     */
    async isOrganizationRegisterFromSID(organizationSID){
        let data = await db.query(`
            SELECT count(*) 
            FROM organizations 
            WHERE lower("organizationSID") = lower($1)`,[organizationSID]);
        let count = parseInt(data.rows[0].count,10)
        if (count===0){
            return false
        }else if(count===1){
            return true
        }else {
            return log.warn('Un sid est enregistrer plus de une fois dans la BDD ce n\'est normalement pas possible')
        }
    },
    /**
     * Permet de récupérer une organisation depuis sont SID
     * @param {String} organizationSID
     * @return {Promise<Organization>}
     */
    async getOrganizationFromSID(organizationSID) {
        let data = await db.query(`
            SELECT *
            FROM organizations
            WHERE lower("organizationSID") = lower($1)`, [organizationSID]);
        let returnOrganization = {}
        returnOrganization = data.rows[0]
        let lang = await this.getLangFromID([returnOrganization.langID])
        returnOrganization.lang = lang[0]
        return returnOrganization
    },
    /**
     * Permet d'obtenir le nom de langue(s) depuis son(leurs) id
     * @param {*|HTMLTableRowElement|string} langIDs
     * @return {Promise<[]>}
     */
    async getLangFromID(langIDs){
        let strReturn = ""
        let returnedLang = []
        for (let i = 0; i < langIDs.length; i++) {
            strReturn += '$'+(i+1)+','
        }
        strReturn = strReturn.substr(0, strReturn.length - 1);
        let data = await db.query(`
            select lang.lang
            from lang
            where lang."langISO" in (${strReturn})`, langIDs)
        for(let lang of data.rows){
            returnedLang.push(lang.lang)
        }
        return returnedLang
    },
    /**
     * Permet d'obtenir l'id de langue(s) depuis son(leurs) nom
     * @param {*|HTMLTableRowElement|string} lang
     * @return {Promise<[]>}
     */
    async getLangIDs(lang) {
        let strReturn = ""
        let returnedLang = []
        for (let i = 0; i < lang.length; i++) {
            strReturn += '$'+(i+1)+','
        }
        strReturn = strReturn.substr(0, strReturn.length - 1);
        let data = await db.query(`
            select "langISO"
            from lang
            where lang.lang in (${strReturn})`, lang)
        for(let lang of data.rows){
            returnedLang.push(lang.langISO)
        }
        return returnedLang
    },
    async getShips(searchString){
        let shipsData = await db.query(
    `SELECT *
            from ship
            WHERE SIMILARITY(slug,$1)>0.4
            order by ship.name`,[searchString.replace(' ','-')]
        )
        let shipsArray = []
        for (let shipData of shipsData.rows) {
            let manufactureData = await db.query(`select * from manufacture where "manufacturerCode" = $1`,[shipData.manufacturerCode])
            let ship = {}
            ship = shipData
            ship.manufacture = manufactureData.rows[0]
            shipsArray.push(ship)
        }
        return shipsArray
    },
    async countHandle(){
        let data = await db.query(`
            SELECT count(*) 
            FROM USERS`);
        return parseInt(data.rows[0].count,10)
    },
    async getGuildPrefix(guildID){
        let data = await db.query(`
            SELECT prefix 
            FROM server
            where "guildID" = $1
        `,[guildID])
        if (data.rows[0].prefix===null){
            return process.env.PREFIX
        }else {
            return data.rows[0].prefix
        }
    },
    async getGuildLang(guildID){
        let data = await db.query(`
            SELECT "langID" 
            FROM server
            where "guildID" = $1
        `,[guildID])
        if (data.rows.length===0){
            return process.env.PREFIX
        }else {
            if(data.rows[0].prefix){
                return data.rows[0].prefix
            }
            else{
                return process.env.PREFIX
            }
        }
    }
}
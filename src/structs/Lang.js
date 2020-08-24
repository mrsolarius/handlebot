const fsPromises = require('fs').promises
const path = require('path')
const select = require('../interfaces/database/select')

class Lang {
    trad = require('../../ressources/lang/fr.json')

    constructor(langID,translation){
        this.langID = langID
        this.trad = translation
    }

    static async readLangs(){
        const folderPath = path.join(__dirname, '..','..', 'ressources', 'lang')
        const fileNames = await fsPromises.readdir(folderPath)
        return fileNames.filter(name => /\.json$/.test(name)).map(name => name.replace('.json', ''))
    }

    static async initialize () {
        if (this.initialized) {
            return
        }
        const langs = await this.readLangs()

        for (let lang of langs){
            const trad = require(`../../ressources/lang/${lang}.json`)
            this.langs.set(lang, new Lang(lang,trad))
        }

        this.initialized = true
    }

    /**
     * Récupération d'une commande stoker dans le dossier commands grasse au message envoyer
     * @param {import('discord.js').Message} message
     * @returns Lang
     */
    static async tryGetLang(message) {
        const {guild} = message
        let langID = process.env.LANG
        const guildLangID = await select.getGuildLang(guild.id)
        if (guildLangID){
            langID = guildLangID
        }
        return this.get(langID)
    }

    static get (lang) {
        return Lang.langs.get(lang)
    }

}

/**
 * Inisialisation de la classe lang sur l'import
 */
Lang.initialized = false
Lang.initialize()
/**
 * Inisialisaion des langues
 * @type {Map<string, Lang>}
 */
Lang.langs = new Map()
module.exports = Lang
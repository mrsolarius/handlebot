require('dotenv').config()
const Discord = require('discord.js')
const log = require('../util/logger')
const listeners = require('../util/listeners')
const select = require('../interfaces/database/select')

/**
 * @type {import('discord.js').ClientOptions}
 */
const CLIENT_OPTIONS = {
    /**
     * Permet d'avoirs un cach sur les réaction du bot
     * Cela permet de récupérer 10 evenement de réaction sur un message
     * aprés sa les event de réaction ne serons plus récupérer
     */
    messageCacheMaxSize: 10,
    ws: {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS'
        ]
    }
}


class Client {
    constructor() {
        this.bot=null
    }

    async login(){
        if (this.bot) {
            return log.warn('Pas possible de se connecter le bot et déjà connecter')
        }
        try {
            const client = new Discord.Client(CLIENT_OPTIONS)
            await client.login(process.env.TOKEN)
            this.bot = client
        }catch (err) {
            return log.error(err,'Le bot ne peut pas se connecter')
        }
    }

    start(){
        log.info("le bot le bot et sur le poin de démarer")
        listeners.createManagers(this.bot);
    }

    stop () {
        log.warn('Le bot vas être arreter')
        listeners.disableAll(this.bot)
    }
}

module.exports = Client
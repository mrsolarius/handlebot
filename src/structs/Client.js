require('dotenv').config()
const Discord = require('discord.js')
const log = require('../utils/logger')
const listeners = require('../utils/listeners')
const select = require('../interfaces/database/select')


class Client {
    constructor() {
        this.bot=null
    }

    async login(){
        if (this.bot) {
            return log.warn('Pas possible de se connecter le bot et déjà connecter')
        }
        try {
            const client = new Discord.Client()

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
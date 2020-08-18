const log = require('../utils/logger')
const Command = require('../structs/Command')

/**
 * Handle discord messages from ws
 * @param {import('discord.js').Message} message - Discord message
 */
async function handler (message) {
    const { guild, author, channel, client, member } = message
    if (Command.ignoreMessage(message)) {
        return
    }
    console.log(message.content);
    const command = Command.tryGetCommand(message)
    if (!command) {
        return log.warn('Aucune commande valide de trouver')
    }
    /**
     * @todo mettre en place une configuration des commande par serveur et check si la commande et activer sur le serveur
     */
    if(message.author.bot){
        return log.warn('La commande a était executer par un bot')
    }

    if (command.admin){
        if (!message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            return log.warn(`L'utilisateur n'a pas les droit d'utiliser la commande`)
        }
    }

    log.info(`Used ${command.name}`)
    await command.run(message)
}

module.exports = handler
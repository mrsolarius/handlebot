const log = require('../util/logger')
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
    log.info(`Used ${command.name}`)
    await command.run(message)
}

module.exports = handler
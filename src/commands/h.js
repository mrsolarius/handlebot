const handle = require('./handle')
/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<void>}
 */
module.exports = async (message,lang) => {
    await handle(message,lang)
}
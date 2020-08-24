const corp = require('./corp')
/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<void>}
 */
module.exports = async (message,lang) => {
    await corp(message, lang)
}
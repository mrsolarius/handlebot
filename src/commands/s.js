const ship = require('./ship')
/**
 * @param {import('discord.js').Message} message
 * @param {Lang}lang
 * @returns {Promise<void>}
 */
module.exports = async (message,lang) => {
    await ship(message,lang)
}
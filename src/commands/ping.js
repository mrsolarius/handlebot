const Discord = require('discord.js')
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
    await message.channel.send("pong")
}
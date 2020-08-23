const Discord = require('discord.js')
const client = require('../../structs/Client')
const promptMain = require('./adminPrompts/setLang/main')
const insert = require('../../interfaces/database/insert')

/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<Message>}
 */
module.exports = async (message,lang) => {
    let langKey = await promptMain(message,lang)
    await insert.insertLang(message.guild.id,langKey)
    await message.channel.send(`✅ **${lang.trad.lang_success_msg}**`)
}
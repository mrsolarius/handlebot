const {MessageEmbed} = require('discord.js')
const {countHandle} = require('../interfaces/database/select')
/**
 *
 * @param {import('discord.js').Message} message
 * @param  {Lang} lang
 * @return {Promise<void>}
 */
module.exports = async (message,lang) => {
    let j = Math.floor((process.uptime() % 31536000) / 86400);
    let h = Math.floor((process.uptime() % 86400) / 3600);
    let m = Math.floor((process.uptime() % 3600) / 60);
    let s = Math.round(process.uptime() % 60);
    let CountUser = await countHandle()
    let embedComposer = new MessageEmbed();

    embedComposer.setColor('#007CFF');
    embedComposer.setTitle("Bot Stats");
    embedComposer.addField(lang.trad.servers, message.client.guilds.cache.size, true);
    embedComposer.addField(lang.trad.user_number, message.client.users.cache.size, true);
    embedComposer.addField(lang.trad.user_number_in_db,CountUser.toString(10),true)
    embedComposer.addField(lang.trad.ping,message.client.ws.ping+" ms",true);
    embedComposer.addField(lang.trad.ram_use, (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB", true);
    embedComposer.addField(lang.trad.uptime, `${j}j ${h}h ${m}m ${s}s`,true);
    await message.channel.send(embedComposer);
}
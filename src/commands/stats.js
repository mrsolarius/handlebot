const {MessageEmbed} = require('discord.js')
const {countHandle} = require('../interfaces/database/select')
/**
 *
 * @param {import('discord.js').Message} message
 * @return {Promise<void>}
 */
module.exports = async (message) => {
    let j = Math.floor((process.uptime() % 31536000) / 86400);
    let h = Math.floor((process.uptime() % 86400) / 3600);
    let m = Math.floor((process.uptime() % 3600) / 60);
    let s = Math.round(process.uptime() % 60);
    let CountUser = await countHandle()
    let embedComposer = new MessageEmbed();

    embedComposer.setColor('#007CFF');
    embedComposer.setTitle("Bot Stats");
    embedComposer.addField("Serveurs", message.client.guilds.cache.size, true);
    embedComposer.addField("Nombre d'utilisateur", message.client.users.cache.size, true);
    embedComposer.addField("Nombre d'utiliateur enregistrer",CountUser.toString(10),true)
    embedComposer.addField("Ping",message.client.ws.ping+" ms",true);
    embedComposer.addField("RAM Utilisé", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB", true);
    embedComposer.addField("Uptime", `${j}j ${h}h ${m}m ${s}s`,true);
    embedComposer.setFooter(`Démarrer`);
    embedComposer.setTimestamp(client.readyTimestamp)
    await message.channel.send(embedComposer);
}
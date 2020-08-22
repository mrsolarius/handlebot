const Discord = require('discord.js')
const scapi = require('../interfaces/restAPI/scAPI')
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message) => {
    let r = await scapi.getStarCitizenStats()
    console.log(r)
    let newMessage = new Discord.MessageEmbed();
    newMessage.setTitle("Statut de Star Citizen");
    newMessage.addField("Fan", r.fans.toString(), true);
    if (r.fleet) {
        newMessage.addField("Vaiseau vendu", r.fleet.toString(), true);
    }
    newMessage.addField("Argent récolté", r.funds.toString() + r.funds.toString().slice(r.funds.toString().indexOf(','))+" $", true);
    newMessage.addField("Version Live", r.current_live, true);
    newMessage.setColor('#1681a5');
    await message.channel.send(newMessage);
}
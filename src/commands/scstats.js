const Discord = require('discord.js')
const scapi = require('../interfaces/restAPI/scAPI')
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang) => {
    let r = await scapi.getStarCitizenStats()
    console.log(r)
    let newMessage = new Discord.MessageEmbed();
    newMessage.setTitle(lang.trad.status_of_sc);
    newMessage.addField(lang.trad.fan, r.fans.toString(), true);
    if (r.fleet) {
        newMessage.addField(lang.trad.ship_sold, r.fleet.toString(), true);
    }
    newMessage.addField(lang.trad.money_raised, r.funds.toString() + r.funds.toString().slice(r.funds.toString().indexOf(','))+" $", true);
    newMessage.addField(lang.trad.live_version, r.current_live, true);
    newMessage.setColor('#1681a5');
    await message.channel.send(newMessage);
}
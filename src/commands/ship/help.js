const {MessageEmbed} = require('discord.js')
const {getGuildPrefix} = require('../../interfaces/database/select')

/**
 *
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @return {Promise<void>}
 */
module.exports = async (message,lang) =>  {
     let prefix = await getGuildPrefix(message.guild.id)
    let embed = new MessageEmbed();
    embed.setColor('#1681a5');
    embed.setTitle(lang.trad.help+" !");
    embed.setDescription(lang.trad.ship_help_description);
    embed.addField(prefix+"ship `"+lang.trad.name_of_ship+"`","```css\n"+lang.trad.ship_help_name+"```");
    embed.addField(prefix+"ship search","```css\n"+lang.trad.start_ship_conversation+"```");
    embed.addField("Note !",lang.trad.can_replace+" `"+prefix+"ship` "+lang.trad.by+" `"+prefix+"s`");
    message.channel.send(embed);
};
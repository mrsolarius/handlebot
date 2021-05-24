const {MessageEmbed} = require('discord.js')

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @param {string} prefix
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang,prefix) =>{
    let newMessage = new MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle(lang.trad.help+" !");
    newMessage.setDescription(lang.trad.referral_help_desc)
    newMessage.addField(`${prefix}referral`,`\`\`\`css\n${lang.trad.referral_help_random}\n\`\`\``,true);
    newMessage.addField(`${prefix}referral set ${lang.trad.your_referral}`,`\`\`\`css\n${lang.trad.referral_help_set}\n\`\`\``,true);
    newMessage.addField(`${prefix}referral status`,`\`\`\`css\n${lang.trad.referral_help_status}\n\`\`\``,true);
    newMessage.addField(`${lang.trad.note} !`,`${lang.trad.need_more_help}\n${lang.trad.no_panic} [${lang.trad.click_here}](https://discordapp.com/invite/JhwbdNG) ${lang.trad.to_join_support}`,false);
    message.channel.send(newMessage)
}
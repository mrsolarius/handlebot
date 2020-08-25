const Discord = require('discord.js')

/**
 * @param {Lang} lang
 * @param {import('discord.js').Message} message
 * @param prefix
 * @returns {Promise<void>}
 */
module.exports = async (message,lang,prefix) => {
    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle(lang.trad.help+" !");
    newMessage.setDescription(lang.trad.handle_help_description);
    newMessage.addField(`${prefix}handle info"`,`\`\`\`css${lang.trad.dont_know_handle}\n\`\`\``,true);
    newMessage.addField(`${prefix}handle set *\`${lang.trad.your_handle}\`*`,`\`\`\`css\n${lang.trad.can_define_handle}\`\`\``,true);
    newMessage.addField(`${prefix}handle unset`,`\`\`\`css\n${lang.trad.delete_handle}\`\`\``,true);
    newMessage.addField(`${prefix}handle`,`\`\`\`css\n${lang.trad.display_profile}\`\`\``,true);
    newMessage.addField(`${prefix}handle *\`@${lang.trad.member}\`*`,`\`\`\`css\n${lang.trad.display_member_profile}\n\`\`\``,true);
    newMessage.addField(`${prefix}handle *\`${lang.trad.handle}\`*`,`\`\`\`css${lang.trad.display_handle_profile}\n\`\`\``,true);
    newMessage.addField(`${lang.trad.note} !`,`${lang.trad.can_replace} \`${prefix}handle\` ${lang.trad.by} \`${prefix}h\` ${lang.trad.if_want}\n\n${lang.trad.need_more_help}\n${lang.trad.no_panic} [${lang.trad.click_here}](https://discordapp.com/invite/JhwbdNG) ${lang.trad.to_join_support}`,false);
    await message.channel.send(newMessage);
}
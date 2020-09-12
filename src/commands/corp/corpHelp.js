const Discord = require('discord.js')

module.exports = async (message,lang,prefix) =>
{
    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle(lang.trad.help+" !");
    newMessage.setDescription(lang.trad.corp_help_info, true);
    newMessage.addField(`${prefix}corp`, `\`\`\`css\n${lang.trad.corp_help_display_msg}\n\`\`\``,true);
    newMessage.addField(`${prefix}corp *\`@${lang.trad.member}\`*`, `\`\`\`css\n${lang.trad.corp_help_display_org_member}\n\`\`\``, true);
    newMessage.addField(`${prefix}corp *\`OrgSID\`*`, `\`\`\`css\n${lang.trad.corp_help_display_org}\`\`\``, true);
    newMessage.addField(lang.trad.note+" !", `${lang.trad.can_replace} \`${prefix}corp\` ${lang.trad.by} \`${prefix}c\` ${lang.trad.if_want}.\n\n${lang.trad.need_more_help}\n${lang.trad.no_panic} [${lang.trad.click_here}](https://discordapp.com/invite/JhwbdNG) ${lang.trad.to_join_support}`);
    await message.channel.send(newMessage);
}
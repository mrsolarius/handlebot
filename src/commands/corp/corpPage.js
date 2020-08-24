const Discord = require('discord.js')

module.exports = async (message, organization,lang) => {
    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle(organization.name);
    newMessage.setThumbnail(organization.logo);
    newMessage.setURL(`https://robertsspaceindustries.com/orgs/${organization.sid}`);
    newMessage.setImage(organization.banner);
    newMessage.setDescription(organization.sid);
    newMessage.addField(lang.trad.member, organization.memberCount, true);
    newMessage.addField(lang.trad.archetype, organization.archetype, true);
    newMessage.addField(lang.trad.commitment, organization.commitment, true);
    newMessage.addField(lang.trad.recruiter, organization.recruiting, true);
    newMessage.addField(lang.trad.role_play, organization.roleplay, true);
    if (organization.lang !== null)
        newMessage.addField(lang.trad.language, organization.lang, true);
    newMessage.addField(lang.trad.description, organization.headline);
    await message.channel.send(newMessage);
}
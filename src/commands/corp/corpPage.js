const Discord = require('discord.js')

module.exports = async (message, organization) => {
    let newMessage = new Discord.RichEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle(organization.name);
    newMessage.setThumbnail(organization.logo);
    newMessage.setURL(`https://robertsspaceindustries.com/orgs/${organization.sid}`);
    newMessage.setImage(organization.banner);
    newMessage.setDescription(organization.sid);
    newMessage.addField("Membre", organization.memberCount, true);
    newMessage.addField("Archetype", organization.archetype, true);
    newMessage.addField("Commitment", organization.commitment, true);
    newMessage.addField("Recrute", organization.recruiting, true);
    newMessage.addField("Roleplay", organization.roleplay, true);
    if (organization.lang !== null)
        newMessage.addField("Langue", organization.lang, true);
    newMessage.addField("Description", organization.headline);
    await message.channel.send(newMessage);
}
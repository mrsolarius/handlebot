const Discord = require('discord.js')
const User = require('./../../models/User')

/**
 *
 * @param {import('discord.js').Message} message
 * @param {User} user
 * @return {Promise<void>}
 */
module.exports = async (message, user) => {
    let newMessage = new Discord.MessageEmbed();
    newMessage.setTitle("Profil RSI");
    newMessage.setThumbnail(user.avatarURL);
    newMessage.setURL(user.pageLink);
    newMessage.setAuthor(user.badge, user.badgeImage);
    newMessage.addField("Handle", user.handle, true);
    newMessage.addField("Pseudo", user.displayName, true);
    if (user.lang)
        newMessage.addField("Langue(s) parlée(s)", user.lang.join(), true);
    if (user.organizationSID)
        newMessage.addField("Organisation", `*Organisation :* ${user.organizationSID}\n*Rank :* ${user.organizationRank}`, true);
    if (user.bio)
        newMessage.addField("Bio", user.bio);
    newMessage.setColor('#1681a5');

    if (user.discordID) {
        console.log(user.discordID)
        let member = await message.client.users.fetch(user.discordID).catch(err=>{
            console.log(err)
        })
        if (member) {
            let avatar = member.avatarURL({dynamic: true});
            let tag = member.tag;
            newMessage.setFooter(tag, avatar);
        }
    }

    newMessage.setTimestamp();
    await message.channel.send(newMessage);
}
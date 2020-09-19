const Discord = require('discord.js')
const User = require('./../../models/User')

/**
 *
 * @param {import('discord.js').Message} message
 * @param {User} user
 * @return {Promise<void>}
 */
module.exports = async (message, user,lang) => {
    let newMessage = new Discord.MessageEmbed();
    newMessage.setTitle(lang.trad.rsi_profile);
    newMessage.setThumbnail(user.avatarURL);
    newMessage.setURL(user.pageLink);
    newMessage.setAuthor(user.badge, user.badgeImage);
    newMessage.addField(lang.trad.handle, user.handle, true);
    newMessage.addField(lang.trad.username, user.displayName, true);
    if (user.lang)
        newMessage.addField(lang.trad.lang_speak, user.lang.join(), true);
    if (user.organizationSID)
        newMessage.addField(lang.trad.org, `*${lang.trad.org} :* ${user.organizationSID}\n*${lang.trad.rank} :* ${user.organizationRank}`, true);
    if (user.referral)
        newMessage.addField(lang.trad.referral_code,user.referral,true)
    if (user.bio)
        newMessage.addField(lang.trad.biographies, user.bio);
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
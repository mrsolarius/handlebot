const User = require('../../models/User')
const {MessageEmbed} = require('discord.js')

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @param {String} prefix
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang,prefix) =>{
    const user = await User.tryGetUserFromDiscord(message.author.id)
    if (!user)return message.channel.send(`⚠ **${lang.trad.handle_not_associate_1} : \`${prefix}handle set ${lang.trad.your_handle_cmd}\` ${lang.trad.to_associate_one} **`)
    if (!user.referral)return message.channel.send(`⚠ ** ${lang.trad.referral_not_associated} : \`${prefix}referral set ${lang.trad.your_referral}\`  ${lang.trad.to_associate_one}**`)
    let status = new MessageEmbed()
    status.setColor('#1681a5');
    status.setTitle(lang.trad.referral_status)
    status.setThumbnail(user.avatarURL);
    status.addField(lang.trad.handle, user.handle, true);
    status.addField(lang.trad.referral_code, user.referral, true);
    status.addField(lang.trad.referral_number_print, user.referralPrint, true);
    let member = await message.client.users.fetch(user.discordID).catch(err=>{
        console.log(err)
    })
    if (member) {
        let avatar = member.avatarURL({dynamic: true});
        let tag = member.tag;
        status.setFooter(tag, avatar);
    }
    status.setTimestamp();
    return message.channel.send(status)
}
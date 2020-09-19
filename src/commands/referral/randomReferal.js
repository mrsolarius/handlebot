const {updatePrintStat} = require("../../interfaces/database/update");
const {getRandomUserWithReferral} = require("../../interfaces/database/select");
const {MessageEmbed} = require('discord.js')

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @param {string} prefix
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang) =>{
    const user = await getRandomUserWithReferral()
    if (!user)return message.channel.send(`⚠ **${lang.trad.no_referral}**`)
    let randomReferral = new MessageEmbed()
    randomReferral.setAuthor(lang.trad.referral_code)
    randomReferral.setTitle(user.referral)
    randomReferral.setColor('#1681a5')
    randomReferral.setFooter(user.handle+' • '+lang.trad.referral_show+' '+user.referralPrint, user.avatarURL);
    await message.channel.send(randomReferral)
    return updatePrintStat(user.referralPrint, user.discordID)
}
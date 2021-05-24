const {updateReferral} = require("../../interfaces/database/update");
const {isRegisterFromDiscordID,referralExist} = require("../../interfaces/database/select");

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @param {string} prefix
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang,prefix) =>{
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===3) {
        if (/STAR-[A-Z-1-9]{4}-[A-Z-1-9]{4}/g.exec(contentArray[2])[0] === contentArray[2] && contentArray[2]!=="STAR-XXXX-XXXX") {
            if (await isRegisterFromDiscordID(message.author.id)) {
                if (!await referralExist(contentArray[2])) {
                    console.log(contentArray[2])
                    console.log(contentArray[2].length)
                    await updateReferral(message.author.id, contentArray[2])
                    return await message.channel.send(`✅ **${lang.trad.referral_set_success.replace('$', '** *`' + prefix + 'referral status`')}*`)
                }else{
                    return await message.channel.send(`⚠ **${lang.trad.referral_set_already_exist}**`)
                }
            } else {
                return await message.channel.send(`⚠  **${lang.trad.referral_set_handle_err}\`${prefix}handle set ${lang.trad.your_handle}\`**`)
            }
        }else {
            return await message.channel.send(`⚠ **${lang.trad.referral_set_format_err}\`STAR-XXXX-XXXX\`**`)
        }
    }else {
        return await message.channel.send(`⚠ **${lang.trad.referral_set_nothing_provide}**`)
    }
}
const insert = require('../../interfaces/database/insert')
/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<Message>}
 */
module.exports = async (message,lang)=>{
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        return await message.channel.send("⚠  **"+lang.trad.need_prefix+"**")
    }else {
        if (contentArray[1].length>3){
            return await message.channel.send("⚠  **"+lang.trad.prefix_no_more_3+"**")
        }
        await insert.insertPrefix(message.guild.id, contentArray[1])
        return await message.channel.send("✅ **"+lang.trad.prefix_has_be_update+"\n"+lang.trad.cmd_need_start_with+" `"+contentArray[1]+"`**")
    }
}
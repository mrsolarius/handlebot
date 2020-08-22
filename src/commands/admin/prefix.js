const insert = require('../../interfaces/database/insert')
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<Message>}
 */
module.exports = async (message)=>{
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        return await message.channel.send("⚠  **Veuillez indiqué un prefix**")
    }else {
        if (contentArray[1].length>5){
            return await message.channel.send("⚠  **Votre Prefix ne doit pas faire plus de 5 charachter**")
        }
        await insert.insertPrefix(message.guild.id, contentArray[1])
        return await message.channel.send("✅ **Le prefix à bien était modifier !\nVos commande doive maintenant commencée par `"+contentArray[1]+"`**")
    }
}
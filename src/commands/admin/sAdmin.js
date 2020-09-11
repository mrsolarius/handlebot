const Discord = require('discord.js')
const client = require('../../structs/Client')
const promptMain = require('./adminPrompts/sendGlobalMessage/main')

async function sendToAllOwner(message,sendMessage){
    await message.client.guilds.cache.map((guild) =>{
        message.client.users.fetch(guild.owner.id).then(u =>{
            u.send('__**Message pour le Owner de _'+guild.name+'_**__\n'+sendMessage+'\n\n')
        })
    })
}
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<Message>}
 */
module.exports = async (message) => {
    if (message.author.id==='195121362371608576'){
        let messageToSend = await promptMain(message)
        if (messageToSend) {
            let infoMsg = await message.channel.send('⏳ **Message en cour d\'envoie**')
            await sendToAllOwner(message, messageToSend)
            return await infoMsg.edit('✅ **Votre message à bien était envoyer**')
        }
    }
}
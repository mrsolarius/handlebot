const handleHelp = require('./handle/handleHelp')
const handleProfile = require('./handle/handleProfile')
const User = require('../models/User')

/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
    //séparation des élément de la commande en tableau
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        let user = await User.tryGetUserFromDiscord(message.author.id)
        if (user) {
            return await handleProfile(message, user)
        } else {
            return await message.channel.send("⚠ **Vous n'avez pas de handle associer, veuillez executer la commande suivante : `!handle set votrehandele` pour vous en associer un **")
        }
    }
    if (contentArray.length>=2) {
        switch (contentArray[1]) {
            case 'set':
                User.tryGetUserFromHandle(contentArray[2])
                break;
            case 'unset':
                break;
            case 'help':
                await handleHelp(message)
                break;
            default:
                if (contentArray.length===2) {
                    if (message.mentions.members.array().length === 1) {
                        let user = await User.tryGetUserFromDiscord(message.mentions.members.first().id)
                        if (user) {
                            return await handleProfile(message, user)
                        } else {
                            return await message.channel.send("⚠ **Le membre mentioné na pas de handle associer**")
                        }
                    } else {
                        let user = await User.tryGetUserFromHandle(contentArray[1])
                        if (user) {
                            return await handleProfile(message, user)
                        } else {
                            return await message.channel.send("⚠  **Le Handle indiqué n'a pas été trouver**")
                        }
                    }
                }
                break;
        }
    }
    await message.channel.send("⚠ **Votre comande est invalide `!handle help` pour plus d'information**")
}
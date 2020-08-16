const handleHelp = require('./handle/handleHelp')
const handleProfile = require('./handle/handleProfile')
const handleSet = require('./handle/handleSet')
const handleInfo = require('./handle/handleInfo')
const User = require('../models/User')
const select = require('../interfaces/database/select')
const update = require('../interfaces/database/update')
const del = require('../interfaces/database/delete')

/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message) => {
    //séparation des élément de la commande en tableau
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        let user = await User.tryGetUserFromDiscord(message.author.id)
        if (user) {
            return Promise.all([handleProfile(message, user),update.updateUser(user)])
        } else {
            return await message.channel.send("⚠ **Vous n'avez pas de handle associer, veuillez executer la commande suivante : `!handle set votrehandele` pour vous en associer un **")
        }
    }
    if (contentArray.length>=2) {
        switch (contentArray[1]) {
            case 'set':
                if (contentArray[2]){
                    return await handleSet(message,contentArray[2])
                }else {
                    return await message.channel.send("⚠  **Votre commande doit indiquer un handle aprés le parmettre set**")
                }
                break;
            case 'unset':
                if (await select.isRegisterFromDiscordID(message.author.id)){
                    return Promise.all([message.channel.send("✅ **Votre profile à bien été suprimer de la base de donnée**"),del.unset(message.author.id)])
                }else{
                    return await message.channel.send("✅ **Votre handle n'est déjà plus associer à votre compte discord**")
                }
                break;
            case 'info':
                return await handleInfo(message)
                break;
            case 'help':
                return await handleHelp(message)
                break;
            default:
                if (contentArray.length===2) {
                    if (message.mentions.members.array().length === 1) {
                        let user = await User.tryGetUserFromDiscord(message.mentions.members.first().id)
                        if (user) {
                            return Promise.all([handleProfile(message, user),update.updateUser(user)])
                        } else {
                            return await message.channel.send("⚠ **Le membre mentioné na pas de handle associer**")
                        }
                    } else {
                        let user = await User.tryGetUserFromHandle(contentArray[1])
                        if (user) {
                            return Promise.all([handleProfile(message, user),update.updateUser(user)])
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
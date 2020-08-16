const User = require('../models/User')
const select = require('../interfaces/database/select')
const Organization = require('../models/Organization')
const CorpPage = require('./corp/corpPage')
const CorpHelp = require('./corp/corpHelp')

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
            if (user.organizationSID){
                return await CorpPage(message,await Organization.tryGetOrganizationFromSID(user.organizationSID))
            }else {
                return await message.channel.send("⚠ **Vous n'êtes dans aucune Organisation**")
            }
        } else {
            return await message.channel.send("⚠ **Vous n'avez pas de handle associer, veuillez executer la commande suivante : `!handle set votrehandele` pour vous en associer un **")
        }
    }
    if (contentArray.length >= 2){
        if (contentArray[1]==="help"){
            return await CorpHelp(message)
        }
        if (message.mentions.members.array().length === 1){
            let user = await User.tryGetUserFromDiscord(message.mentions.members.first().id)
            if (user) {
                if (user.organizationSID){
                    let organization = await Organization.tryGetOrganizationFromSID(user.organizationSID)
                    return await CorpPage(message,organization)
                }else {
                    return await message.channel.send("⚠ **Le membre mentionée n'est dans aucune Organisation**")
                }
            }else {
                return await message.channel.send("⚠ **Le membre mentionée n' pas de handle associer.**")
            }
        }else {
            let organization = await Organization.tryGetOrganizationFromSID(contentArray[1])
            if (organization){
                return await CorpPage(message,organization)
            }else {
                return await message.channel.send("⚠ **Le SID de l'organisation indiquer n'existe pas.**")
            }
        }
    }
}
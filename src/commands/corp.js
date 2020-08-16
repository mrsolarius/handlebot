const User = require('../models/User')
const select = require('../interfaces/database/select')
const Organization = require('../models/Organization')
const CorpPage = require('./corp/corpPage')

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
}
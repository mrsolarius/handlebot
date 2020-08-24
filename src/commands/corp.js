const User = require('../models/User')
const select = require('../interfaces/database/select')
const Organization = require('../models/Organization')
const CorpPage = require('./corp/corpPage')
const CorpHelp = require('./corp/corpHelp')

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang) => {
    const prefix = await select.getGuildPrefix(message.guild.id)
    //séparation des élément de la commande en tableau
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        let user = await User.tryGetUserFromDiscord(message.author.id)
        if (user) {
            if (user.organizationSID){
                return await CorpPage(message,await Organization.tryGetOrganizationFromSID(user.organizationSID))
            }else {
                return await message.channel.send(`⚠ **${lang.trad.err_you_not_in_org}**`)
            }
        } else {
            return await message.channel.send(`⚠ **${lang.trad.handle_not_associate_1} : \`${prefix}handle set ${lang.trad.your_handle_cmd}\` ${lang.trad.handle_not_associate_2} **`)
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
                    return await message.channel.send(`⚠ **${lang.trad.member_no_orga}**`)
                }
            }else {
                return await message.channel.send(`⚠ **${lang.trad.member_no_handle}**`)
            }
        }else {
            let organization = await Organization.tryGetOrganizationFromSID(contentArray[1])
            if (organization){
                return await CorpPage(message,organization,lang)
            }else {
                return await message.channel.send(`⚠ **${lang.trad.sid_not_exist}**`)
            }
        }
    }
}
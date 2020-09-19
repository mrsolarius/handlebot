const handleHelp = require('./handle/handleHelp')
const handleProfile = require('./handle/handleProfile')
const handleSet = require('./handle/handleSet')
const handleInfo = require('./handle/handleInfo')
const User = require('../models/User')
const select = require('../interfaces/database/select')
const update = require('../interfaces/database/update')
const del = require('../interfaces/database/delete')
const {getUser} = require("../interfaces/restAPI/scAPI");

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
            return Promise.all([handleProfile(message, user, lang),update.updateUser(await User.tryGetUserFromHandle(user.handle, true))])
        } else {
            return await message.channel.send(`⚠ **${lang.trad.handle_not_associate_1} : \`${prefix}handle set ${lang.trad.your_handle_cmd}\` ${lang.trad.handle_not_associate_2} **`)
        }
    }
    if (contentArray.length>=2) {
        switch (contentArray[1]) {
            case 'set':
                if (contentArray[2]){
                    return await handleSet(message,contentArray[2],lang,prefix)
                }else {
                    return await message.channel.send(`⚠  **${lang.trad.need_handle}**`)
                }
                break;
            case 'unset':
                if (await select.isRegisterFromDiscordID(message.author.id)){
                    return Promise.all([message.channel.send(`✅ **${lang.trad.handle_rm_success}**`),del.unset(message.author.id)])
                }else{
                    return await message.channel.send(`✅ **${lang.trad.handle_not_associate_unset}**`)
                }
                break;
            case 'info':
                return await handleInfo(message,lang)
                break;
            case 'help':
                return await handleHelp(message,lang,prefix)
                break;
            default:
                if (contentArray.length===2) {
                    if (message.mentions.members.array().length === 1) {
                        let user = await User.tryGetUserFromDiscord(message.mentions.members.first().id)
                        if (user) {
                            return Promise.all([handleProfile(message, user, lang),update.updateUser(await User.tryGetUserFromHandle(user.handle, true))])
                        } else {
                            return await message.channel.send(`⚠ **${lang.trad.member_no_handle}**`)
                        }
                    } else {
                        let user = await User.tryGetUserFromHandle(contentArray[1])
                        if (user) {
                            return Promise.all([handleProfile(message, user, lang),update.updateUser(await User.tryGetUserFromHandle(user.handle, true))])
                        } else {
                            return await message.channel.send(`⚠ **${lang.trad.handle_not_exist}**`)
                        }
                    }
                }
                break;
        }
    }
    await message.channel.send(`⚠ **${lang.trad.unvalidated_cmd} \`${prefix}handle help\` ${lang.trad.for_more_info}**`)
}
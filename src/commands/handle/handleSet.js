const Discord = require('discord.js')
const User = require('./../../models/User')
const Organization = require('./../../models/Organization')
const select = require('../../interfaces/database/select')
const insert = require('../../interfaces/database/insert')
const scapi = require("../../interfaces/restAPI/scAPI")


/**
 *
 * @param {import('discord.js').Message} message
 * @param {string} handle
 * @param {Lang} lang
 * @param prefix
 * @return {Promise<Message>}
 */
module.exports = async (message,handle,lang,prefix) => {
    let user
    if (!await select.isRegisterFromDiscordID(message.author.id)) {
        if (!await select.isRegisterFromHandle(handle)) {
            user = await User.tryGetUserFromHandle(handle)
            if (user) {
                user.discordID = message.author.id
                if (!await select.isOrganizationRegisterFromSID(user.organizationSID)) {
                    await insert.insertOrganisation(await Organization.tryGetOrganizationFromSID(user.organizationSID))
                }
                await insert.insertUser(user)
                return await message.channel.send(`✅ **${lang.trad.handle_success_associate} \`${prefix}handle\`${lang.trad.to_display_profile}**`)
            } else {
                await message.channel.send(`⚠ **${lang.trad.warm}, ${lang.trad.handle_not_exist}**`)
            }
        } else {
            user = await User.tryGetUserFromHandle(handle)
            return await message.channel.send(`⚠ **${lang.trad.warm}, ${lang.trad.handle_already_use_by} <@${user.discordID }>**"`)
        }
    }else {
        return await message.channel.send(`⚠ **${lang.trad.warm}, ${lang.trad.handle_already_associate}.\n${lang.trad.execute_next_cmd} \`${prefix}handle unset\` ${lang.trad.before_associate_another_handle}**`)
    }
}
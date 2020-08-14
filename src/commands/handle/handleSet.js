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
 * @return {Promise<Message>}
 */
module.exports = async (message,handle) => {
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
                return await message.channel.send("✅ **Votre handle à bien était associer `!handle`pour afficher votre profile**")
            } else {
                await message.channel.send("⚠ **Attention, le handle indiquer n'existe pas**")
            }
        } else {
            console.log("là")
            user = await User.tryGetUserFromHandle(handle)
            return await message.channel.send("⚠ **Attention, le handle indiquer et déjà pris par <@" + user.discordID + ">**")
        }
    }else {
        return await message.channel.send("⚠ **Attention, votre handle et déjà associer.\nVeuillez executer la commande `!handle unset` avant de vous associer à un autre handle**")
    }
}
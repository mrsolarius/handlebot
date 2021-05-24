const {updateReferral} = require("../interfaces/database/update");
const {isRegisterFromDiscordID,getGuildPrefix} = require("../interfaces/database/select");
const setReferral = require('./referral/referralSet')
const referralStatus = require('./referral/referralStatus')
const randomReferral = require('./referral/randomReferal')
const referralHelp = require('./referral/referralHelp')

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async (message,lang) => {
    const prefix = await getGuildPrefix(message.guild.id)
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        return randomReferral(message,lang)
    }
    if (contentArray.length>=2) {
        switch (contentArray[1]) {
            case 'set':
                return setReferral(message,lang,prefix)
            case 'status':
                return referralStatus(message,lang,prefix)
            case 'help':
                return referralHelp(message,lang,prefix)
        }
    }
}
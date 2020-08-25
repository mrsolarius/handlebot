const DiscordPrompt = require("discord.js-prompts");
const { Client,message, MessageEmbed } = require('discord.js')
const {getShips} = require('../interfaces/database/select')
const {updateShips} = require('../models/Ship')
const fleetYard = require('../interfaces/restAPI/fleetYardsAPI')
const rm = require('discord.js-reaction-menu');
const askShipMain = require('./prompts/shipProposition/main')
const displayShip = require('./ship/displayShip')
const shipHelp = require('./ship/help')
const searchShip = require('./ship/searchShip')
/**
 *
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @return {Promise<Message>}
 */
module.exports = async (message,lang) => {
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        return message.channel.send("⚠ **"+lang.trad.need_ship_name+"**")
    }else{
        switch (contentArray[1]) {
            case 'help':
                await shipHelp(message,lang)
                return null
            case 'search':
                await searchShip(message,lang)
                return null
            case 'update':
                let msg = await message.channel.send('⏳ **'+lang.trad.update_ship_wait+'**')
                await updateShips().then(function () {
                    msg.edit('✅ **'+lang.trad.ship_list_update_success+'**')
                }).catch(function () {
                    msg.edit(`❌ **${lang.trad.unknown_error}**`)
                })
                return null
            default:
                let ships = await getShips(contentArray.slice(1,contentArray.length).join('_'))
                if (ships.length!==0){
                    if (ships.length===1){
                        return displayShip(message,ships[0],lang)
                    }else {
                        let data = await askShipMain(message,ships,lang)
                        return displayShip(message,ships[data.ship],lang)
                    }
                }else {
                    return message.channel.send("⚠ **"+lang.trad.no_ship_with_name+" `"+ contentArray.slice(1,contentArray.length).join(' ')+"` "+lang.trad.as_been_found+"**")
                }
        }
    }

}

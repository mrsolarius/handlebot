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
 * @return {Promise<Message>}
 */
module.exports = async (message) => {
    const contentArray = message.content.split(' ').map(item => item.trim())
    if (contentArray.length===1){
        return message.channel.send("⚠ **Veuillez indiquer un nom de vaisseau**")
    }else{
        switch (contentArray[1]) {
            case 'help':
                await shipHelp(message)
                return null
            case 'search':
                await searchShip(message)
                return null
            case 'update':
                let msg = await message.channel.send('⏳ **Mise a jour des vaiseaux en cour veuillez pasienter**')
                await updateShips().then(function () {
                    msg.edit('✅ **la liste des vaisseau à bien était mise à jour**')
                }).catch(function () {
                    msg.edit(`❌ **Une erreur inatendu c'est produit la liste n'a pas put être mise à jour**`)
                })
                return null
            default:
                let ships = await getShips(contentArray.slice(1,contentArray.length).join('_'))
                if (ships.length!==0){
                    if (ships.length===1){
                        displayShip(message,ships[0])
                    }else {
                        let data = await askShipMain(message,ships)
                        return displayShip(message,ships[data.ship])
                    }
                }else {
                    return message.channel.send("⚠ **Aucun vaisseau ce nommant `"+ contentArray.slice(1,contentArray.length).join(' ')+"` n'a était trouver**")
                }
        }
    }

}

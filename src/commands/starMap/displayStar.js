const DiscordPrompt = require("discord.js-prompts");
const { Client,message, MessageEmbed } = require('discord.js')
const rm = require('discord.js-reaction-menu');

/**
 *
 * @param {import('discord.js').Message} message
 * @param {Star} stars
 * @param {Lang} lang
 * @returns {Promise<void>}
 */
module.exports = async (message,stars,lang) => {

    let starMsg = new MessageEmbed()
    starMsg.setColor(stars.affiliation.colorAffiliation)
    starMsg.description = stars.description
    starMsg.title = stars.starCode
    starMsg.setAuthor(stars.affiliation.name)
    starMsg.setImage(stars.imgURL)
    starMsg.fields = [
        {
            name:'Taille',
            value:stars.aggregatedSize,
            inline:true
        },
        {
            name:'Capteur d\'économie',
            value: stars.aggregatedEconomy,
            inline:true
        },
        {
            name:'Capteur de population',
            value: stars.aggregatedPopulation,
            inline:true
        }
    ];

    await message.channel.send(starMsg);
}
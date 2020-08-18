const DiscordPrompt = require("discord.js-prompts");
const { Client,message, MessageEmbed } = require('discord.js')
const rm = require('discord.js-reaction-menu');

module.exports = async (message,shipSearchData) => {

    let allEmbed = []
    for (let i = 0; i < shipSearchData.length; i++) {
        let newMessage = new MessageEmbed();
        newMessage.setTitle('Vos vehicles')
        newMessage.setDescription('Voici le résulatat de votre recherche')
        newMessage.setFooter(`Page ${i+1}/${shipSearchData.length}`)
        newMessage.setTimestamp()
        newMessage.setColor('#229954')
        for (let j = 0; j < shipSearchData[i].length ; j++) {
            newMessage.addField(shipSearchData[i][j].name,
`\`\`\`css
Marque : ${shipSearchData[i][j].manufacturer.name}
Equipage : ${shipSearchData[i][j].max_crew}
Longeur : ${shipSearchData[i][j].length} m
Largeur : ${shipSearchData[i][j].beam} m
Hauteur : ${shipSearchData[i][j].height} m
Masse : ${shipSearchData[i][j].mass} kg
Vitesse de croisière : ${shipSearchData[i][j].scm_speed} m/s
Vitesse maximum : ${shipSearchData[i][j].afterburner_speed} m/s
Cargot : ${shipSearchData[i][j].cargocapacity} scm
\`\`\``,true)
        }
        allEmbed.push(newMessage)
    }
    new rm.menu(
        message.channel,
        message.author.id,
        allEmbed,
        60000,
        {back: '◀',stop: '⏹', next: '▶'}
    )
}
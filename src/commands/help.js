const {MessageEmbed} = require('discord.js')
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
    let aide = new MessageEmbed()
    let starCitizen = new MessageEmbed()

    aide.setColor('#1681a5');
    aide.setTitle("Aide !");
    aide.setDescription(`Voici un résumé de tout ce que le handle bot est capable de faire\n\nSi vous avait trouver un bug ou que vous avez besoin d'aider [cliquer ici](https://discord.gg/JhwbdNG) pour rejoindre le discord officiel du bot\n\nPour invitée le bot sur votre serveur [cliquer ici](https://discordapp.com/oauth2/authorize?client_id=397402496676659201&scope=bot&permissions=27712)`);

    starCitizen.setColor('#42EEF4');
    starCitizen.setTitle(":rocket:Star Citizen");
    starCitizen.addField("!handle help", "```css\nAffiche l'aide de toutes les commandes en rapport avec le handle.```", true);
    starCitizen.addField("!corp help", "```css\nAffiche l'aide de toutes les commandes permettant d'afficher des information sur les corporation```", true);
    starCitizen.addField("!ship help", "```css\nAffiche l'aide de toutes les commandes en rapport avec le vaiseau spatial.```", true);
    starCitizen.addField("!scstats", "```css\nAffiche les statistique actuel de Star Citizen```", true);

    await message.channel.send(aide)
    await message.channel.send(starCitizen)
}

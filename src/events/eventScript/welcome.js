const Discord = require('discord.js')

/**
 * Envoie un message de bienvenue à tous les owner des serveur discord
 * @param {import('discord.js').Guild}guild
 * @return {Promise<void>}
 */
module.exports = async (guild) =>{
    let hello = new Discord.MessageEmbed();
    hello.setColor('#1681a5');
    hello.setTitle("Merci ! (cliquer ici pour rejoindre le discord officiel du bot)");
    hello.setURL("https://discord.gg/JhwbdNG");
    hello.setDescription("Merci beaucoup d'avoire ajouter Handle Bot à votre serveur discord, je vous en suis tres reconaissent.");
    hello.addField("Info sur les permition",
        `De base l'handle bot a les mêmes premitions que votre grade @everyone
        Il ne verra que les channels que votre groupe @everyone voit.
        Si vous voulez l'utiliser dans un channel que le groupe @everyone ne voit pas ajouter à son grade les droits.
        Si vous rencontrez des problèmes randez-vous sur le discord officiel du HandleBot : [discord.gg/JhwbdNG](https://discord.gg/JhwbdNG)`);
    await (await guild.members.fetch(guild.ownerID)).send(hello);
}
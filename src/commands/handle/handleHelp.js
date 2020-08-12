const Discord = require('discord.js')

/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle("Aide !");
    newMessage.setDescription("Cette commande est une sorte de page blanche des Handles sur discord. Elle vous permet de retrouver l'Handle d'une personne à partir de son discord et inversement.Elle permet aussi par le même système d'afficher le profil RSI d'un membre.");
    newMessage.addField("!handle info","```css\nVous ne savez pas ce qu'est le handle alors taper cette commande.```",true);
    newMessage.addField("!handle set *`VotreHandle`*","```css\nPermet de définir votre Handle```",true);
    newMessage.addField("!handle unset","```css\nSupprime votre handle associé```",true);
    newMessage.addField("!handle","```css\nAffiche votre profile RSI```",true);
    newMessage.addField("!handle *`@UnMembre`*","```css\nPermet de voir le profil du membre\n```",true);
    newMessage.addField("!handle *`UnHandle`*","```css\nPermet de voir le profil du handle choisie```",true);
    newMessage.addField("Note !","Vous pouvez remplacer `!handle` par `!h` si vous le souhaitez.\n\nVous avez encore besoin d'aide ?\nPas de panique [cliquer ici](https://discordapp.com/invite/JhwbdNG) pour rejoindre le discord officiel du handlebot",false);
    await message.channel.send(newMessage);
};
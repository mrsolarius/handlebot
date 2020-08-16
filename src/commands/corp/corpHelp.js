const Discord = require('discord.js')

module.exports = async function(message)
{
    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle("Aide !");
    newMessage.setDescription("Cette commande vous permet d'afficher les information d'une corporation.", true);
    newMessage.addField("!corp", "```css\nAffiche les informations de votre corporation```");
    newMessage.addField("!corp *`@UnMembre`*", "```css\nPermet d'afficher les informations de la corporation du membre\n```", true);
    newMessage.addField("!corp *`UnSID`*", "```css\nPermet d'afficher les informations de la corporation choisie```", true);
    newMessage.addField("Note !", "Vous pouvez remplacer `!corp` par `!c` si vous le souhaitez.\n\nVous avez encore besoin d'aide ?\nPas de panique [cliquer ici](https://discordapp.com/invite/JhwbdNG) pour rejoindre le discord officiel du handlebot", true);
    await message.channel.send(newMessage);
}
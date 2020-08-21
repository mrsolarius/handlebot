const {MessageEmbed} = require('discord.js')

module.exports = async (message) =>  {
    let embed = new MessageEmbed();
    embed.setColor('#1681a5');
    embed.setTitle("Aide !");
    embed.setDescription("Cette commande vous permet d'afficher les information d'une vaiseau.",true);
    embed.addField("!ship `nom d'un vaisseau`","```css\nAffiche des informations sur le vaisseau recherché```");
    embed.addField("!ship search","```css\nLance une conversation avec le bot vous permettant de trouver le vaiseau le plus adapter à vos besoin```");
    embed.addField("Info !",
`Le bot vous permet de voir le stade de développement des vaisseaux comme montré ci-dessous :\n
Le message s'affiche :\n
    \`\`\`css\n
En Vert   => Vaisseau est disponible Ingame.
En Cyan   => Vaisseau n'est pas jouable.
En Orange => Vaisseau est en production.
En Rouge  => Vaisseau n'est actuellement pas  en développement mais est prévu.\`\`\``);
    embed.addField("Note !","Vous pouvez également remplacer `!ship` par `!s`");
    message.channel.send(embed);
};
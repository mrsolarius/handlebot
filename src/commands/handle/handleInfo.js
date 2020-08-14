const Discord = require('discord.js')

/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle("C'est quoi le handle ?");
    newMessage.setDescription("Le handle est votre identifiant RSI en jeu (différent de votre identifiant de connexion).\n" +
        "Il vous permet de retrouver vos amis dans le jeu et sur spectrum.\n" +
        "\n" +
        "Cet identifiant se trouve sur le site de RSI comme montré ci-dessous…\n" +
        "\n" +
        "L’intérêt du handle bot est d’ajouter simplement ses amis discord grâce a un lien entre votre compte discord et votre compte RSI.\n" +
        "Ainsi, si l’un de vos ami discord veut jouer, il n’a qu’à vous mentionner dans une commande afin de vous retrouver.");
    newMessage.setImage("https://images-ext-1.discordapp.net/external/wdmvxNxac8mxuf6_gNZ3cu_mQhFUSq3n7cOxTXKW8dg/https/image.ibb.co/dMi6rd/c_est_quoi_le_handle.jpg")
    await message.channel.send(newMessage);
};
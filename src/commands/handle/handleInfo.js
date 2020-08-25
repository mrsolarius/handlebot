const Discord = require('discord.js')

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<void>}
 */
module.exports = async (message,lang ) => {

    let newMessage = new Discord.MessageEmbed();
    newMessage.setColor('#1681a5');
    newMessage.setTitle(lang.trad.what_is_handle);
    newMessage.setDescription(lang.trad.handle_is_identify+"\n"
        +lang.trad.find_friend_in_game+"\n\n"
        +lang.trad.find_the_id+"\n\n"
        +lang.trad.handle_goal+"\n"
        +lang.trad.friend_find_you);
    newMessage.setImage("https://images-ext-1.discordapp.net/external/wdmvxNxac8mxuf6_gNZ3cu_mQhFUSq3n7cOxTXKW8dg/https/image.ibb.co/dMi6rd/c_est_quoi_le_handle.jpg")
    await message.channel.send(newMessage);
};
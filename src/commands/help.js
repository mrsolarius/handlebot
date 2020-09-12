const {MessageEmbed,Permissions} = require('discord.js')
const {getGuildPrefix} = require('../interfaces/database/select')
/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message,lang) => {
    const prefix = await getGuildPrefix(message.guild.id)
    let aide = new MessageEmbed()
    let starCitizen = new MessageEmbed()
    let admin = new MessageEmbed()

    aide.setColor('#1681a5');
    aide.setTitle(lang.trad.help+" !");
    aide.setDescription(`${lang.trad.bot_help_description}\n\n${lang.trad.find_bug_or_need_help} [${lang.trad.click_here}](https://discord.gg/JhwbdNG) ${lang.trad.to_join_support}\n\n${lang.trad.to_invite_bot} [${lang.trad.click_here}](https://discordapp.com/oauth2/authorize?client_id=397402496676659201&scope=bot&permissions=27712)`);

    starCitizen.setColor('#42EEF4');
    starCitizen.setTitle(":rocket: Star Citizen");
    starCitizen.addField(prefix+"handle help", "```css\n"+lang.trad.handle_help+"\n```", true);
    starCitizen.addField(prefix+"corp help", "```css\n"+lang.trad.corp_help+"\n```", true);
    starCitizen.addField(prefix+"ship help", "```css\n"+lang.trad.ship_help+"\n```", true);
    starCitizen.addField(prefix+"scstats", "```css\n"+lang.trad.sc_stat_help+"\n```", true);

    await message.channel.send(aide)
    await message.channel.send(starCitizen)
    if (message.member.hasPermission(Permissions.FLAGS.ADMINISTRATOR)){
        admin.setColor('#fd3131')
        admin.setTitle(":bulb: Administrateur")
        admin.addField(prefix+"prefix `unPrefix`","```css\nPermet de changer le prefix des commandes\n```",true)
        admin.addField(prefix+"lang","```css\nPermet de changer la langue du bot\n```",true)
        await message.channel.send(admin)
    }
}

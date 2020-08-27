const {Message} = require('discord.js')
const {DiscordPrompt, Rejection, PromptNode, DiscordPromptRunner, MessageVisual, Errors} = require('discord.js-prompts')
const askLang = require('./askLang')


module.exports = async (message,lang) =>{
    const runner = new DiscordPromptRunner(message.author)
    try {
        let langkey, langNode
        langNode = await  askLang(lang)
        let data = await runner.run(langNode, message.channel)
        langkey = data.langKey
        return langkey
    } catch (err) {
        console.log(err)
        if (err instanceof Errors.UserInactivityError) {
            await message.channel.send(`❌ **${lang.trad.warm_for_inactivity}**`)
        } else if (err instanceof Errors.UserVoluntaryExitError) {
            await message.channel.send(`✅ **${lang.trad.user_stop_prompt} **`)
        } else {
            await message.channel.send(`⚠ **${lang.trad.unknown_error}**`)
        }
    }
}
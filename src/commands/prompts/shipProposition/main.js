const {Message} = require('discord.js')
const {DiscordPrompt, Rejection, PromptNode, DiscordPromptRunner, MessageVisual, Errors} = require('discord.js-prompts')
const askShip = require('./askShip')

module.exports = async (message,shipArray,lang) => {
    const runner = new DiscordPromptRunner(message.author)
    try {
        return {ship} = await runner.run(askShip(shipArray,lang), message.channel)
    } catch (err) {
        console.log(err)
        if (err instanceof Errors.UserInactivityError) {
            await message.channel.send("❌ **"+lang.trad.warm_for_inactivity+"**")
        } else if (err instanceof Errors.UserVoluntaryExitError) {
            await message.channel.send("✅ **"+lang.trad.user_stop_prompt+"**")
        } else {
            await message.channel.send("⚠ **"+lang.trad.unknown_error+"**")
        }
    }
}
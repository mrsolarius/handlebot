const {Message} = require('discord.js')
const {DiscordPrompt, Rejection, PromptNode, DiscordPromptRunner, MessageVisual, Errors} = require('discord.js-prompts')
const askShip = require('./askShip')

module.exports = async (message,shipArray) => {
    const runner = new DiscordPromptRunner(message.author)
    try {
        return {ship} = await runner.run(askShip(shipArray), message.channel)
    } catch (err) {
        console.log(err)
        if (err instanceof Errors.UserInactivityError) {
            await message.channel.send("❌ **Notre conversation a était stoper pour inctiviter de votre part**")
        } else if (err instanceof Errors.UserVoluntaryExitError) {
            await message.channel.send("✅ **Alors comme sa tu veut plus parler avec moi... Trés bien je met un terme à notre conversation**")
        } else {
            await message.channel.send("⚠ **Une erreur iconue c'est produit je ne peut plus te répondre**")
        }
    }
}
const {Message} = require('discord.js')
const {DiscordPrompt, Rejection, PromptNode, DiscordPromptRunner, MessageVisual, Errors} = require('discord.js-prompts')
const askMessage = require('./askMessage')
const askConfirmation = require('./askConfirmation')

askMessage.addChild(askConfirmation)

module.exports = async (message) =>{
    const runner = new DiscordPromptRunner(message.author)
    try {
        let sendMessage,send
        do {
            let data = await runner.run(askMessage, message.channel)
            send = data.send
            sendMessage = data.sendMessage
            console.log(send)
        }while (!send)
        console.log(sendMessage)
        return sendMessage
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
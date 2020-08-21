const {DiscordPrompt, MessageVisual, PromptNode, Rejection} = require("discord.js-prompts");

const askMessage= new PromptNode(
    new DiscordPrompt(
        new MessageVisual("Veuillez indiquer le message à envoyer a tous les admnisitrateur ci dessous :"),
        async (m, data) => {
            let sendMessage = m.content
            return {
                ...data,
                sendMessage,
            }
        }
    )
)

module.exports = askMessage
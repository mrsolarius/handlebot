const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const askLengthVisual = async (data) => {
    return new MessageVisual(
        "Voici le message que vous vous apréter à envoyer :\n```md\n"+data.sendMessage.replace(/`/g,"\` ")+"```\n" +
        "Cela vous convient t-il : \n" +
        "```ldif\n" +
        "Oui : Envera votre message à tous les admin utilisant le handleBot\n" +
        "Non : Vous demandera d'entrer à nouveau votre message\n" +
        "Exit : Annulera l'envoie du message.\n" +
        "```"
    )
}

const askLengthMin = new PromptNode(
    new DiscordPrompt(
        askLengthVisual,
        async (m, data) => {
            let send
            switch (m.content.toLowerCase()) {
                case 'oui':
                    send=true
                    break
                case 'non':
                    send=false
                    break
                default:
                    throw new Rejection('Veuillez indiquer un mot cles de la liste')
            }
            return {
                ...data,
                send,
            }
        }
    )
)

module.exports = askLengthMin
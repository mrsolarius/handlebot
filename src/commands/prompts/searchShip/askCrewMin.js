const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const askLengthVisual = async (data) => {
    return new MessageVisual(
`Ok votre vehicle fera au maximum ${data.LengthMax} métre.
Combien de membre d'équipage souhaite tu avoirs au minimum avec toi ? (Si tu n'en veut pas répond 1)`
    )
}

const askLengthMin = new PromptNode(
    new DiscordPrompt(
        askLengthVisual,
        async (m, data) => {
            const CrewMin = parseInt(m.content, 10)
            if (Number.isNaN(CrewMin)) throw new Rejection('Veuillez indiquer un nombre')
            if (CrewMin < 1) throw new Rejection(`Indique au moins 1 membre d'équipage c'est à dire toi`)
            if (CrewMin >1000)throw new Rejection(`Tu à indiquer un peut trop de membre d'équipage... Indique un nombre plus petit`)
            return {
                ...data,
                CrewMin,
            }
        }
    )
)

module.exports = askLengthMin
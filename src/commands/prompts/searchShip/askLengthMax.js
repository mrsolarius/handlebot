const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const askLengthVisual = async (data) => {
    return new MessageVisual(
`Ok votre vehicle fera au moin ${data.LengthMin} métre.
Quelle est la taille maximum que vous souhaiter pour votre vaiseau ? (indiquer une valeur numérique en métre)`
    )
}

const askLengthMin = new PromptNode(
    new DiscordPrompt(
        askLengthVisual,
        async (m, data) => {
            const LengthMax = parseInt(m.content, 10)
            if (Number.isNaN(LengthMax)) throw new Rejection('Please enter a number.')
            if (LengthMax > 1000) throw new Rejection(
        `Euuuh un vaisseau de ${LengthMax/1000} km !! Nan mais même les vaiseau de l'UEE sont pas si long\nChoisie un nombre plus petit`)
            if (LengthMax <= data.LengthMin + 5) throw new Rejection(
        `M'enfin ta longeur maximal et inferieur à ta longeur minimal\nChoisie un nombre plus grand que ${data.LengthMin+5}`)
            return {
                ...data,
                LengthMax,
            }
        }
    )
)

module.exports = askLengthMin
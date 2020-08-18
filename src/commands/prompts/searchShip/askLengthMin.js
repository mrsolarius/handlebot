const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const askLengthVisual = async (data) => {
    return new MessageVisual(
`Trés bien vous souhaiter donc un vehiclule de type ${data.Type}.
Quelle est la taille minimum que vous souhaiter pour votre vaiseau ? (indiquer une valeur numérique en métre)`
    )
}

const askLengthMin = new PromptNode(
    new DiscordPrompt(
        askLengthVisual,
        async (m, data) => {
            const LengthMin = parseInt(m.content, 10)
            if (Number.isNaN(LengthMin)) throw new Rejection('Veuillez indiquer un nombre.')
            if (LengthMin > 250) throw new Rejection(`Ce n'est que la taile minimum, et ${LengthMin} métre sa fait déja beaucoup, là, non ?`)
            if (LengthMin <= 2) throw new Rejection(`Euhh quand même c'est petit ${LengthMin} métre pour un vehicle...`)
            return {
                ...data,
                LengthMin,
            }
        }
    )
)

module.exports = askLengthMin
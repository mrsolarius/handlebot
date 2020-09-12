const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");



module.exports = function (lang) {

    const askLengthVisual = async (data) => {
        return new MessageVisual(
            `${lang.trad.you_want_this_type_of_vehicle} ${data.Type}.\n`+
                `${lang.trad.witch_minimal_size}*(${lang.trad.in_meter})*`
        )
    }

    return new PromptNode(
        new DiscordPrompt(
            askLengthVisual,
            async (m, data) => {
                const LengthMin = parseInt(m.content, 10)
                if (Number.isNaN(LengthMin)) throw new Rejection(lang.trad.warm_number)
                if (LengthMin > 250) throw new Rejection(lang.trad.to_big_min.replace('$',LengthMin))
                if (LengthMin <= 1) throw new Rejection(lang.trad.to_tiny_min.replace('$',LengthMin))
                return {
                    ...data,
                    LengthMin,
                }
            }
        )
    )
}

const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

module.exports = function (lang) {
    const askLengthVisual = async (data) => {
        return new MessageVisual(
            lang.trad.min_size_confirm.replace('$',data.LengthMin)+"\n" +
            lang.trad.witch_maximal_size+"*("+lang.trad.in_meter+")*"
        )
    }

    return new PromptNode(
        new DiscordPrompt(
            askLengthVisual,
            async (m, data) => {
                const LengthMax = parseInt(m.content, 10)
                if (Number.isNaN(LengthMax)) throw new Rejection(lang.trad.warm_number)
                if (LengthMax > 1000) throw new Rejection(`${lang.trad.to_big_max.replace('$',LengthMax / 1000)} \n${lang.trad.choose_tiny_number}`)
                if (LengthMax <= data.LengthMin + 5) throw new Rejection(
                    `${lang.trad.minimal_greater_max_size}\n${lang.trad.choose_big_number} ${data.LengthMin + 5}`)
                return {
                    ...data,
                    LengthMax,
                }
            }
        )
    )
}
const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

module.exports = function (lang) {
    const askLengthVisual = async (data) => {
        return new MessageVisual(lang.trad.max_size_confirm.replace('$',data.LengthMax)+"\n"+
        lang.trad.witch_min_crew+ "*("+lang.trad.min_one_crew+")*")
    }

    return new PromptNode(
        new DiscordPrompt(
            askLengthVisual,
            async (m, data) => {
                const CrewMin = parseInt(m.content, 10)
                if (Number.isNaN(CrewMin)) throw new Rejection(lang.trad.warm_number)
                if (CrewMin < 1) throw new Rejection(lang.trad.to_tiny_crew)
                if (CrewMin > 1000) throw new Rejection(lang.trad.to_big_crew+" "+lang.trad.choose_tiny_number)
                return {
                    ...data,
                    CrewMin,
                }
            }
        )
    )
}
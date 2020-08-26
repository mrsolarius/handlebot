const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

module.exports = function (lang) {
    const askLengthVisual = async (data) => {
        return new MessageVisual(lang.trad.min_crew_confirm.replace('$',data.CrewMin)+"\n"+
                                    lang.trad.witch_max_crew+" *("+lang.trad.if_lonely+")*"
        )
    }

    const askLengthMin = new PromptNode(
        new DiscordPrompt(
            askLengthVisual,
            async (m, data) => {
                const CrewMax = parseInt(m.content, 10)
                if (Number.isNaN(CrewMax)) throw new Rejection(lang.trad.warm_number)
                if (CrewMax < 1) throw new Rejection(lang.trad.crew_max_warm_inf_1)
                if (CrewMax < data.CrewMin) throw new Rejection(lang.trad.minimal_greater_max_crew+"\n"+lang.trad.choose_big_number+" "+data.CrewMin)
                if (CrewMax === Number.POSITIVE_INFINITY) throw new Rejection(lang.trad.infinity_warm)
                if (CrewMax > 7000000000) throw new Rejection(lang.trad.humanity_warm)
                if (CrewMax > 1400000000) throw new Rejection(lang.trad.chinese_warm)
                if (CrewMax > 446000000) throw new Rejection(lang.trad.europe_warm)
                if (CrewMax > 67848156) throw new Rejection(lang.trad.french_warm)
                if (CrewMax > 10000) throw new Rejection(lang.trad.to_big_crew_big_confirm)
                return {
                    ...data,
                    CrewMax,
                }
            }
        )
    )
}
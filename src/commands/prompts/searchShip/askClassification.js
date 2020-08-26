const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const parmArray = ['combat' , 'transport' , 'exploration' , 'industrial' , 'support' , 'competition' , 'ground' , 'multi']

module.exports = function (lang) {
    return new PromptNode(
        new DiscordPrompt(
            new MessageVisual(
                lang.trad.witch_ship_do_you_want+"\n" +
                "_"+lang.trad.indicate_number_before_proposition+"_\n" +
                "_**1**_ - **`"+lang.trad.combat+"`** "+lang.trad.if_you_want_explode_all+"\n" +
                "_**2**_ - **`"+lang.trad.transportation+"`** "+lang.trad.to_be_rich+"\n" +
                "_**3**_ - **`"+lang.trad.exploration+"`** "+lang.trad.to_be_curious+"\n" +
                "_**4**_ - **`"+lang.trad.industrial+"`** "+lang.trad.to_get_work+"\n" +
                "_**5**_ - **`"+lang.trad.support+"`** "+lang.trad.to_help_big_fleet+"\n" +
                "_**6**_ - **`"+lang.trad.race+"`** "+lang.trad.to_be_racer+"\n" +
                "_**7**_ - **`"+lang.trad.ground+"`** "+lang.trad.to_be_roll_ground+"\n" +
                "_**8**_ - **`"+lang.trad.multicrew+"`** "+lang.trad.to_play_with_friend
            ),
            async (m, data) => {
                let Type;
                const number = parseInt(m.content, 10)
                if (Number.isNaN(number)) throw new Rejection(lang.trad.warm_number)
                if (number < 1 || number > 8) throw new Rejection(lang.trad.warm_number_in_list)
                Type = parmArray[number - 1]
                return {
                    ...data,
                    Type,
                }
            }
        )
    )
}
const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

module.exports = function (shipsArray,lang) {
    let str = lang.trad.witch_vehicle_you_want+"\n"+
    "_"+lang.trad.number_proposition+"_\n" +
    "```css\n"
    for (let i = 0; i <shipsArray.length ; i++) {
        str += `${i+1} - ${shipsArray[i].name}\n`
    }
    str+="```"
    return new PromptNode(
        new DiscordPrompt(
            new MessageVisual(str),
            async (m, data) => {
                let ship;
                const number = parseInt(m.content, 10)
                if (Number.isNaN(number)) throw new Rejection(lang.trad.warm_number)
                if (number < 1 || number > shipsArray.length) throw new Rejection(lang.trad.warm_number_in_list)
                ship = number-1
                return {
                    ...data,
                    ship,
                }
            }
        )
    )
}

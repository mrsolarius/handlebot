const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

module.exports = function (shipsArray) {
    let str = "Quel vehicle recherche tu exactement ?\n"+
    "_Indique le nombre devant la proposition qui te convien_\n" +
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
                if (Number.isNaN(number)) throw new Rejection('Indique un chiffre corespondant à une des proposition ')
                if (number < 1 || number > shipsArray.length) throw new Rejection(`Indique un chiffre présent dans la list`)
                ship = number-1
                return {
                    ...data,
                    ship,
                }
            }
        )
    )
}

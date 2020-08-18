const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const parmArray = ['combat' , 'transport' , 'exploration' , 'industrial' , 'support' , 'competition' , 'ground' , 'multi']

const askClassification = new PromptNode(
    new DiscordPrompt(
        new MessageVisual(
            "Quelle type de vehicle recherche tu ?\n" +
            "_Indique le nombre devant la proposition qui te plais_\n" +
            "_**1**_ - **`Combat`** parfait si tu veut faire TOUS PETER !\n" +
            "_**2**_ - **`Transport`** pour etancher ta soif d'ouisifter et de richesse\n" +
            "_**3**_ - **`Exploration`** pour les plus curieux d'entre vous\n" +
            "_**4**_ - **`Industriel`** si tu souhaite que ton vaisseau devienne ton lieux de travail\n" +
            "_**5**_ - **`Support`** si tu souahite aider une flote plus grande\n" +
            "_**6**_ - **`Course`** si tu compte devenir un ass du pilotage\n" +
            "_**7**_ - **`Sol`** pour facilement arpenter le sol des planette et des lune\n" +
            "_**8**_ - **`Multicrew`** pour jouer avec tes amis"
        ),
        async (m, data) => {
            let Type;
            const number = parseInt(m.content, 10)
            if (Number.isNaN(number)) throw new Rejection('Indique un chiffre corespondant à une des proposition ')
            if (number < 1 || number > 8) throw new Rejection(`Indique un chiffre présent dans la list`)
            Type = parmArray[number-1]
            return {
                ...data,
                Type,
            }
        }
    )
)

module.exports = askClassification
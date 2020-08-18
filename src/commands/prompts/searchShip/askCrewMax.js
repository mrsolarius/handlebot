const {DiscordPrompt, MessageVisual,PromptNode,Rejection} = require("discord.js-prompts");

const askLengthVisual = async (data) => {
    return new MessageVisual(
`Entendu au moins ${data.CrewMin} membre(s) d'équipage.
Combien de membre d'équipage souhaite tu avoirs au maximum avec toi ? (Si tu veut être seul répond 1)`
    )
}

const askLengthMin = new PromptNode(
    new DiscordPrompt(
        askLengthVisual,
        async (m, data) => {
            const CrewMax = parseInt(m.content, 10)
            if (Number.isNaN(CrewMax)) throw new Rejection('Veuillez indiquer un nombre')
            if (CrewMax < 1) throw new Rejection(`Indique au moins 1 membre d'équipage c'est à dire toi`)
            if (CrewMax<data.CrewMin) throw new Rejection(`M'enfin ton nombre maximal d'équipage est inferieur à ton nombre minimal d'équipage\nChoisie un nombre plus grand ou egal à ${data.CrewMin} mètre`)
            if (CrewMax===Number.POSITIVE_INFINITY) throw new Rejection(`Nan tu tes cru pour Tanos un nombre infiny de persone dans ton vaisseau... Mais oui bien sure, choisie un nombre __beaucoup__ plus petit.`)
            if (CrewMax>7000000000)throw new Rejection(`Ok donc tu veut que ton vaisseau puisse acceuilir toute l'humaniter...Choisie un nombre plus petti`)
            if (CrewMax>1400000000)throw new Rejection(`Ouais un vaisseau pouvant acceuilir toutes la chine.. Si tu veut :joy:. Plus serieusement prend un nombre moin grand`)
            if (CrewMax>446000000)throw new Rejection(`Vas y pour un vaisseau pouvant acceuilr tous les habitant d'europe... Prend un nombre plus petit ^^`)
            if (CrewMax>67848156)throw new Rejection(`Ok donc la ton vaisseau pourais emporter tous les habitant de la france OK... Bon si tu choisisez un nombre plus petit`)
            if (CrewMax>10000)throw new Rejection(`Tu à indiquer un peut trop de membre d'équipage... Indique un nombre plus petit`)
            return {
                ...data,
                CrewMax,
            }
        }
    )
)

module.exports = askLengthMin
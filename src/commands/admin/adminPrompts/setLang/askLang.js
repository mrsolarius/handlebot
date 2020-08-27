const {DiscordPrompt, MessageVisual, PromptNode, Rejection} = require("discord.js-prompts");
const Lang = require('../../../../structs/Lang')

const askLang = async(lang) =>{
    let languages = await Lang.readLangs()
    return new PromptNode(
        new DiscordPrompt(
            new MessageVisual(`${lang.trad.ask_for_server_lang} : \`${languages.toString()}\``),
            async (m, data) => {
                let langKey = m.content
                if (languages.indexOf(langKey)<0) throw new Rejection(lang.trad.ask_for_known_word)
                return {
                    ...data,
                    langKey,
                }
            }
        )
    )
}

module.exports = askLang
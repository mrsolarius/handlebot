const {Message} = require('discord.js')
const {DiscordPrompt, Rejection, PromptNode, DiscordPromptRunner, MessageVisual, Errors} = require('discord.js-prompts')
const {searchShip} = require('../interfaces/restAPI/scAPI')
const sendSearchMessage = require('./ship/sendSearchResultMessage')
const askClassification = require('./prompts/searchShip/askClassification')
const askLengthMin = require('./prompts/searchShip/askLengthMin')
const askLengthMax =require('./prompts/searchShip/askLengthMax')
const askCrewMin = require('./prompts/searchShip/askCrewMin')
const askCrewMax = require('./prompts/searchShip/askCrewMax')



askClassification.addChild(askLengthMin)
askLengthMin.addChild(askLengthMax)
askLengthMax.addChild(askCrewMin)
askCrewMin.addChild(askCrewMax)

/**
 *
 * @param {import('discord.js').Message} message
 * @return {Promise<void>}
 */
module.exports = async (message) => {


    const runner = new DiscordPromptRunner(message.author)


    console.log('Running prompt')
    try {
        const data = await runner.run(askClassification, message.channel)
        let waitMessage = await message.channel.send("⌛ **Votre recherche est en cour de traitement**")
        console.log('ici')
        try {
            let searchData = await searchShip(data.Type, data.LengthMin, data.LengthMax, data.CrewMin, data.CrewMax)
            await waitMessage.delete()
            await sendSearchMessage(message,searchData)
        }catch(err){
            console.log(err)
            await waitMessage.edit('⚠ **Une erreur inatendu c\'est produit**')
        }
    } catch (err) {
        console.log(err)
        if (err instanceof Errors.UserInactivityError) {
            await message.channel.send("❌ **Notre conversation a était stoper pour inctiviter de votre part**")
        } else if (err instanceof Errors.UserVoluntaryExitError) {
            await message.channel.send("✅ **Alors comme sa tu veut plus parler avec moi... Trés bien je met un terme à notre conversation**")
        } else {
            await message.channel.send("⚠ **Une erreur iconue c'est produit je ne peut plus te répondre**")
        }
    }
}
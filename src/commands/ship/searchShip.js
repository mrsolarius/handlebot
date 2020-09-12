const {Message} = require('discord.js')
const {DiscordPrompt, Rejection, PromptNode, DiscordPromptRunner, MessageVisual, Errors} = require('discord.js-prompts')
const {searchShip} = require('../../interfaces/restAPI/scAPI')
const sendSearchMessage = require('./sendSearchResultMessage')
const askClassificationFunc = require('../prompts/searchShip/askClassification')
const askLengthMinFunc = require('../prompts/searchShip/askLengthMin')
const askLengthMaxFunc =require('../prompts/searchShip/askLengthMax')
const askCrewMinFunc = require('../prompts/searchShip/askCrewMin')
const askCrewMaxFunc = require('../prompts/searchShip/askCrewMax')





/**
 *
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @return {Promise<void>}
 */
module.exports = async (message,lang) => {
    const askClassification = askClassificationFunc(lang)
    const askLengthMin = askLengthMinFunc(lang)
    const askLengthMax = askLengthMaxFunc(lang)
    const askCrewMin = askCrewMinFunc(lang)
    const askCrewMax = askCrewMaxFunc(lang)

    askClassification.addChild(askLengthMin)
    askLengthMin.addChild(askLengthMax)
    askLengthMax.addChild(askCrewMin)
    askCrewMin.addChild(askCrewMax)

    const runner = new DiscordPromptRunner(message.author)
    try {
        const data = await runner.run(askClassification(lang), message.channel)
        let waitMessage = await message.channel.send("⌛ **"+lang.trad.search_in_treatment+"**")
        try {
            let searchData = await searchShip(data.Type, data.LengthMin, data.LengthMax, data.CrewMin, data.CrewMax)
            if (searchData.length!==0){
                await waitMessage.delete()
                await sendSearchMessage(message,searchData)
            }
            else
                await waitMessage.edit("❌ **"+lang.trad.no_result_found+"**")
        }catch(err){
            console.log(err)
            await waitMessage.edit('⚠ **'+lang.trad.unknown_error+'**')
        }
    } catch (err) {
        console.log(err)
        if (err instanceof Errors.UserInactivityError) {
            await message.channel.send("❌ **"+lang.trad.warm_for_inactivity+"**")
        } else if (err instanceof Errors.UserVoluntaryExitError) {
            await message.channel.send("✅ **"+lang.trad.user_stop_prompt+"**")
        } else {
            await message.channel.send("⚠ **"+lang.trad.unknown_error+"**")
        }
    }
}
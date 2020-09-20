const {getAffiliations,getStars,getStarMapObjects,getJumpPointLinks} = require("../../interfaces/restAPI/scAPI");

/**
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @returns {Promise<Message>|Promise<void>}
 */
module.exports = async(message, lang)=>{
    let msg = await message.channel.send('Insertion des afiliation ...')
    const affiliations = await getAffiliations()
    await affiliations.forEach(item=>{
        item.save()
    })

    await msg.edit('Insertion des étoile')
    const stars = await getStars()
    await stars.forEach(item=>{
        item.save()
    })

    await msg.edit('Insertion des objet de la star map')
    const starMapObjects = await getStarMapObjects()
    starMapObjects.forEach(item=>{
        item.save()
    })

    await msg.edit('Insertion des jumpoint')
    const jumpPointLinks = await getJumpPointLinks()
    jumpPointLinks.forEach(item=>{
        item.save()
    })

    await msg.edit('Insertion terminer')
}
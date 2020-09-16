const {getAffiliations,getStars,getStarMapObjects,getJumpPointLinks} = require("../../interfaces/restAPI/scAPI");


module.exports = async(message, lang)=>{
    const affiliations = await getAffiliations()
    await affiliations.forEach(item=>{
        item.save()
    })

    const stars = await getStars()
    await stars.forEach(item=>{
        item.save()
    })

    const starMapObjects = await getStarMapObjects()
    starMapObjects.forEach(item=>{
        item.save()
    })
    /*
    const jumpPointLinks = await getJumpPointLinks()
    jumpPointLinks.forEach(item=>{
        item.save()
    })
    */
}
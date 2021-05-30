const updateStarMap = require('./starMap/update')
const displayStar = require('./starMap/displayStar')
const select = require('../interfaces/database/select')
/**
 *
 * @param {import('discord.js').Message} message
 * @param {Lang} lang
 * @return {Promise<Message>}
 */
module.exports = async (message,lang) => {
    const contentArray = message.content.split(' ').map(item => item.trim())
    switch (contentArray[1]) {
        case 'update':
            return updateStarMap(message,lang)
        case 'help':

            break;
        case 'star':
            const selectStars = await select.getStar(contentArray[2]);
            console.log(selectStars)
            if (selectStars !==false)
                return displayStar(message, selectStars, lang)
            else
                return message.channel.send(`⚠ **Le systeme ${contentArray[2]} na pas été trouvé**`)
            break;
    }
}
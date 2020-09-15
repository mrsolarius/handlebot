const updateStarMap = require('./starMap/update')
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
        case 'default':

            break;
    }
}
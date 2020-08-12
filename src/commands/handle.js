const handleHelp = require('./handle/handleHelp')

/**
 * @param {import('discord.js').Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
    const contentArray = message.content.split(' ').map(item => item.trim())
    console.log(contentArray)
    if (contentArray.length>=2) {
        switch (contentArray[1]) {
            case 'set':
                break;
            case 'unset':
                break;
            case 'help':
                await handleHelp(message)
                break;
            default:
                if (message.mentions.members.array().length === 1) {

                } else {

                }
                break;
        }
    }

}
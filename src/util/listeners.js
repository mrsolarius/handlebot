const fs = require('fs')
const path = require('path')
const eventHandlers = []
/**
 * @type {import('discord.js').Client}
 */
exports.createManagers = (bot) => {
    const fileNames = fs.readdirSync(path.join(__dirname, '..', 'events'))
    for (const fileName of fileNames) {
        const eventName = fileName.replace('.js', '')
        if (eventName!=="eventScript") {
            const eventHandler = require(`../events/${fileName}`)
            eventHandlers.push({name: eventName, func: eventHandler})
            bot.on(eventName, eventHandler)
        }
    }
}
/**
 * @type {import('discord.js').Client}
 */
exports.disableAll = (bot) => {
    for (const eventHandler of eventHandlers) {
        bot.removeListener(eventHandler.name, eventHandler.func)
    }
    eventHandlers.length = 0
}
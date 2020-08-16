const welcome = require('./eventScript/welcome')

async function handler (guild){
    console.log(guild)
    await welcome(guild)
}

module.exports = handler
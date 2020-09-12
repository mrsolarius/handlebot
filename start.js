const dotenv = require('dotenv');
(process.argv[2]==="--dev") ?
    dotenv.config({ path: '.env.dev' })
    : dotenv.config({ path: '.env' });

const BotClient = require('./src/structs/Client');

if (typeof process.env.TOKEN !== 'string') {
    throw new TypeError('Le token doit être un string');
}

const client = new BotClient()
client.login().then(function () {
    client.start()
})

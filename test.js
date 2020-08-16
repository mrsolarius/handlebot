const dotenv = require('dotenv');
dotenv.config({ path: '.env.dev' })
const select = require('./src/interfaces/database/select')

async function test(){
    let data = await select.isOrganizationRegisterFromSID('protectora')
    console.log('ici'+data)
}

test()
const dotenv = require('dotenv');
dotenv.config({ path: '../.env.dev' })
const scAPI = require('../src/interfaces/restAPI/scAPI')
const select = require('../src/interfaces/database/select')
const insert = require('../src/interfaces/database/insert')
const data = require('./handleDATA.json')
const User = require('../src/models/User')

async function setObject(obj) {
    let user = await User.tryGetUserFromHandle(obj.handle)
    if (user) {
        if (user.discordID) return console.log(obj.handle + 'est déjà enregistrer')
        user.discordID = obj.discordID
        if (user.organizationSID) {
            console.log("Organisation du membre : "+user.organizationSID)
            let isRegister = await select.isOrganizationRegisterFromSID(user.organizationSID)
            if (!isRegister) {
                let organization = await scAPI.getOrganization(user.organizationSID)
                await insert.insertOrganisation(organization).then(function () {
                    console.log("Insersion de l'organisation : " + user.organizationSID)
                    insert.insertUser(user)
                    console.log("Insersion du membre : " + obj.handle)
                    return null
                })

            }else {
                await insert.insertUser(user)
                console.log("Insersion du membre : " + obj.handle)
                return null
            }
        }else {
            await insert.insertUser(user)
            console.log("Insersion du membre : " + obj.handle)
            return null
        }
    }
}

async function start() {
    for (let i = 0; i < data.length ; i++) {
        console.log("=======Traitement du membre=======")
        console.log("Membre traiter : "+data[i].handle)
        await setObject(data[i])
        console.log("==================================")
        //if (data[i].handle === "cryofantom")break;
    }
}

start().then(e =>{
    console.log("C'est fini")
})
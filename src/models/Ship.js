const fleetYards = require('../interfaces/restAPI/fleetYardsAPI')
const scAPI = require('../interfaces/restAPI/scAPI')
const {insertShip} = require('../interfaces/database/insert')
const RSIURL = 'https://robertsspaceindustries.com'

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

class Ship {

    constructor() {
        this.manufacture = {}
    }

    /**
     * @return {Promise<void>}
     */
    static async updateShips(){
        let allShip = await fleetYards.getAllShipsName()
        let updateShip = new Promise((resolve, reject) => {
            allShip.forEach((item,index,allShip) => {
               Promise.all([fleetYards.getShip(item), scAPI.getShip(item.replace('-', '%20'))]).then(data => {
                    if (data[1]  && data[0].slug) {
                        let ship = new Ship()
                        ship.slug = item
                        ship.fleetChartImage = data[0].fleetchartImage;
                        ship.inGamePrice = data[0].price;
                        ship.manufacture.logoURL = data[0].manufacturer.logo
                        ship.manufacture.manufacturerCode = data[1].manufacturer.code
                        ship.manufacture.name = data[1].manufacturer.name
                        ship.manufacture.description = data[1].manufacturer.description
                        ship.manufacture.knownFor = data[1].manufacturer.knownFor
                        ship.manufacturerCode = data[1].manufacturer.code
                        ship.name = data[1].name
                        ship.type = data[1].type
                        ship.focus = data[1].focus
                        ship.description = data[1].description
                        ship.beam = data[1].beam
                        ship.height = data[1].height
                        ship.length = data[1].length
                        ship.mass = data[1].mass
                        ship.size = data[1].size
                        ship.cargoCapacity = data[1].cargocapacity
                        ship.maxCrew = data[1].max_crew
                        ship.minCrew = data[1].min_crew
                        ship.afterBurnerSpeed = data[1].afterburner_speed
                        ship.scmSpeed = data[1].smc_speed
                        ship.pitchMax = data[1].pitch_max
                        ship.yawMax = data[1].yaw_max
                        ship.rollMax = data[1].roll_max
                        ship.xAxisAcceleration = data[1].xaxis_acceleration
                        ship.yAxisAcceleration = data[1].yaxis_acceleration
                        ship.zAxisAcceleration = data[1].zaxis_acceleration
                        ship.price = data[1].price
                        ship.productionStatus = data[1].production_status.replace('-', ' ')
                        ship.componentJson = data[1].compiled
                        ship.lastModified = data[1].time_modified_unfiltered
                        validURL(data[1].url) ?
                            ship.url = data[1].url
                            :ship.url = RSIURL + data[1].url
                        validURL( data[1].media[0].images.banner) ?
                            ship.bannerImage = data[1].media[0].images.banner
                            :ship.bannerImage = RSIURL + data[1].media[0].images.banner
                        insertShip(ship).catch(err => {
                            console.log(ship.name)
                            console.log(err)
                        })
                    }
                    if (index === 1){
                        resolve();
                    }
                })
            })
        })
        await updateShip
    }
}

module.exports = Ship
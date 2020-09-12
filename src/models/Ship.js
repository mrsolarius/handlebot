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
    static async updateShips() {
        let allShip = await scAPI.getAllShip()
        for (const SCAPIShip of allShip) {
            if (SCAPIShip) {
                let ship = new Ship()
                try {
                    const FleetYard = await fleetYards.getShip(SCAPIShip.name)
                    ship.slug = FleetYard.slug
                    ship.fleetChartImage = FleetYard.fleetchartImage;
                    ship.inGamePrice = FleetYard.price;
                    ship.manufacture.logoURL = FleetYard.manufacturer.logo
                } catch (e) {
                    ship.slug = SCAPIShip.name.trim().toLowerCase().split(' ').join('-')
                    ship.fleetChartImage = null;
                    ship.inGamePrice = null;
                    validURL(SCAPIShip.manufacturer.media[0].source_url) ?
                        ship.manufacture.logoURL = SCAPIShip.manufacturer.media[0].source_url :
                        ship.manufacture.logoURL = RSIURL + SCAPIShip.manufacturer.media[0].source_url
                } finally {
                    ship.manufacture.manufacturerCode = SCAPIShip.manufacturer.code
                    ship.manufacture.name = SCAPIShip.manufacturer.name
                    ship.manufacture.description = SCAPIShip.manufacturer.description
                    ship.manufacture.knownFor = SCAPIShip.manufacturer.knownFor
                    ship.manufacturerCode = SCAPIShip.manufacturer.code
                    ship.name = SCAPIShip.name
                    ship.type = SCAPIShip.type
                    ship.focus = SCAPIShip.focus
                    ship.description = SCAPIShip.description
                    ship.beam = SCAPIShip.beam
                    ship.height = SCAPIShip.height
                    ship.length = SCAPIShip.length
                    ship.mass = SCAPIShip.mass
                    ship.size = SCAPIShip.size
                    ship.cargoCapacity = SCAPIShip.cargocapacity
                    ship.maxCrew = SCAPIShip.max_crew
                    ship.minCrew = SCAPIShip.min_crew
                    ship.afterBurnerSpeed = SCAPIShip.afterburner_speed
                    ship.scmSpeed = SCAPIShip.smc_speed
                    ship.pitchMax = SCAPIShip.pitch_max
                    ship.yawMax = SCAPIShip.yaw_max
                    ship.rollMax = SCAPIShip.roll_max
                    ship.xAxisAcceleration = SCAPIShip.xaxis_acceleration
                    ship.yAxisAcceleration = SCAPIShip.yaxis_acceleration
                    ship.zAxisAcceleration = SCAPIShip.zaxis_acceleration
                    ship.price = SCAPIShip.price
                    ship.productionStatus = SCAPIShip.production_status.replace('-', ' ')
                    ship.componentJson = SCAPIShip.compiled
                    ship.lastModified = SCAPIShip.time_modified_unfiltered
                    validURL(SCAPIShip.url) ?
                        ship.url = SCAPIShip.url
                        : ship.url = RSIURL + SCAPIShip.url
                    validURL(SCAPIShip.media[0].images.banner) ?
                        ship.bannerImage = SCAPIShip.media[0].images.banner
                        : ship.bannerImage = RSIURL + SCAPIShip.media[0].images.banner
                    await insertShip(ship)
                }
            }
        }
        return
    }
}

module.exports = Ship
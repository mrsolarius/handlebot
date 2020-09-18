const Star = require('./Star')
const Type = require('./Type')
const SubType = require('./SubType')

class StarMapObject {
    star
    type
    subType
    objCode
    appearance
    axialTilt
    name
    description
    designation
    distance
    fairChanceAct
    habitable
    infoURL
    lat
    long
    orbitPeriod
    sensorDanger
    sensorEconomy
    sensorPopulation
    size
    imgURL

    /**
     *
     * @param {Star} star
     * @param {Type} type
     * @param {SubType} subType
     * @param {string} objCode
     * @param {string} appearance
     * @param {float}axialTilt
     * @param {string}name
     * @param {string}description
     * @param {string}designation
     * @param {float}distance
     * @param {boolean}fairChanceAct
     * @param {boolean}habitable
     * @param {string}infoURL
     * @param {float}lat
     * @param {float}long
     * @param {float}orbitPeriod
     * @param {int}sensorDanger
     * @param {int}sensorEconomy
     * @param {int}sensorPopulation
     * @param {float}size
     * @param {string}imgURL
     * @param {Array<StarMapObject>} childs
     */
    constructor(star, type, subType, objCode, appearance, axialTilt, name, description, designation, distance, fairChanceAct, habitable, infoURL, lat, long, orbitPeriod, sensorDanger, sensorEconomy, sensorPopulation, size, imgURL,childs) {
        this.star = star
        this.type = type
        this.subType = subType
        this.objCode = objCode
        this.appearance = appearance
        this.axialTilt = axialTilt
        this.name = name
        this.description = description
        this.designation = designation
        this.distance = distance
        this.fairChanceAct = fairChanceAct
        this.habitable = habitable
        this.infoURL = infoURL
        this.lat = lat
        this.long = long
        this.orbitPeriod = orbitPeriod
        this.sensorDanger = sensorDanger
        this.sensorEconomy = sensorEconomy
        this.sensorPopulation = sensorPopulation
        this.size = size
        this.imgURL = imgURL
        this.childs = childs;
    }

    async save(){
        const {insertChildObject,insertUpdateStarMapObject} = require("../../interfaces/database/insert");
        const parent = this
        await insertUpdateStarMapObject(this)
        /*
        await this.childs.forEach(value => {
            value.save().then(v=>{
                insertChildObject(parent,value)
            })
        })*/
    }
}

exports.build = StarMapObject
class Star {
    starCode;
    affiliation
    description
    aggregatedDanger
    aggregatedEconomy
    aggregatedPopulation
    frostLine
    habitableZoneInner
    habitableZoneOuter
    aggregatedSize
    infoUrl
    positionX
    positionY
    positionZ
    imgURL
    type
    status

    /**
     *
     * @param {string} starCode
     * @param {Affiliation} affiliation
     * @param {string} description
     * @param {float} aggregatedDanger
     * @param {float} aggregatedEconomy
     * @param {float} aggregatedPopulation
     * @param {float} frostLine
     * @param {float} habitableZoneInner
     * @param {float} aggregatedSize
     * @param {float} habitableZoneOuter
     * @param {string} infoUrl
     * @param {float} positionX
     * @param {float} positionY
     * @param {float} positionZ
     * @param {string} imgURL
     * @param {string} type
     * @param {char} status
     */
    constructor(starCode, affiliation, description, aggregatedDanger, aggregatedEconomy, aggregatedPopulation,frostLine, aggregatedSize, habitableZoneInner, habitableZoneOuter, infoUrl, positionX, positionY, positionZ, imgURL, type,status) {
        this.starCode = starCode
        this.affiliation = affiliation
        this.description = description
        this.aggregatedDanger = aggregatedDanger
        this.aggregatedEconomy= aggregatedEconomy
        this.aggregatedPopulation = aggregatedPopulation
        this.aggregatedSize= aggregatedSize
        this.frostLine= frostLine
        this.habitableZoneInner= habitableZoneInner
        this.habitableZoneOuter = habitableZoneOuter
        this.infoUrl= infoUrl
        this.positionX= positionX
        this.positionY= positionY
        this.positionZ= positionZ
        this.imgURL= imgURL
        this.type= type
        this.status= status
    }

    async save(){
        const {insertUpdateStar} = require("../../interfaces/database/insert")
        await insertUpdateStar(this)
    }
}

exports.build = Star
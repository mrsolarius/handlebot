const Type = require('./Type')
const {insertUpdateSubType} = require("../../interfaces/database/insert");

class SubType{
    subTypeID
    nomSubType
    type
    /**
     *
     * @param {Type} type
     * @param {int} subTypeID
     * @param {string} subTypeName
     */
    constructor(type,subTypeID,subTypeName) {
        this.subTypeID = subTypeID
        this.nomSubType = subTypeName
        this.type = type
    }

    async save(){
        await insertUpdateSubType(this)
    }
}

module.exports = SubType
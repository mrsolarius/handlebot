const {insertUpdateType} = require("../../interfaces/database/insert");

class Type {
    typeCode
    nomType
    /**
     * Constructeur de type
     * @param {string} typeCode
     * @param {string} nom
     */
    constructor(typeCode,nom) {
        this.typeCode = typeCode
        this.nomType = nom
    }

    async save(){
        await insertUpdateType(this)
    }
}
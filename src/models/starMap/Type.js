const {insertUpdateType} = require("../../interfaces/database/insert");

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

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
        this.nomType = titleCase(nom)
    }

    async save(){
        await insertUpdateType(this)
    }
}

exports.build = Type
const {insertUpdateType} = require("../../interfaces/database/insert");

/**
 *
 * @param {string} str
 * @return {string}
 */
function titleCase(str) {
    let splitStr = str.toLowerCase().split(new RegExp('\\b(' + [' ','-','_'].join('|') + ')\\b' , "g"));
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ').replace('_',' ').replace('-','_');
}

class Type {
    typeCode
    nomType
    /**
     * Constructeur de type
     * @param {Type} typeCode
     * @param {string} nom
     */
    constructor(typeCode, nom) {
        this.typeCode = typeCode
        this.nomType = titleCase(nom)
    }

    async save(){
        await insertUpdateType(this)
    }
}

exports.build = Type
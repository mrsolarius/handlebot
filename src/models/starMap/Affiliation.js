const {insertUpdateAffiliation} = require("../../interfaces/database/insert");


class Affiliation {
    /**
     *
     * @param {string} codeAffiliation
     * @param {string} colorAffiliation
     * @param {string} name
     */
    constructor(codeAffiliation,colorAffiliation,name) {
        this.codeAffiliation = codeAffiliation
        this.colorAffiliation = colorAffiliation
        this.name = name
    }

    async save(){
        await insertUpdateAffiliation(this)
    }
}

exports.build = Affiliation;
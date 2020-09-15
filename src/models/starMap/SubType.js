const Type = require('Type')

class SubType extends Type{
    /**
     *
     * @param {Type} type
     * @param {int} subTypeID
     * @param {string} subTypeName
     */
    constructor(@null type,subTypeID,subTypeName) {
        super(type.typeCode,type.nom)
        this.id = subTypeID
        this.nomSubType = subTypeName
        this.prentCode = super.typeCode
    }
}
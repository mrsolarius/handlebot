const {insertJumpPointLink} = require("../../interfaces/database/insert");

class JumpPointLink {
    /**
     *
     * @param {StarMapObject}entryStarMapObject
     * @param {StarMapObject}exitStarMapObject
     * @param {String}name
     * @param {char}direction
     * @param {int}size
     */
    constructor(entryStarMapObject,exitStarMapObject,name,direction,size) {
        this.entryStarMapObject = entryStarMapObject
        this.exitStarMapObject = exitStarMapObject
        this.name = name
        this.direction = direction
        this.size = size
    }

    async save(){
        await insertUpdateStarMapObject(this.entryStarMapObject)
        await insertUpdateStarMapObject(this.exitStarMapObject)
        await insertJumpPointLink(this)
    }
}
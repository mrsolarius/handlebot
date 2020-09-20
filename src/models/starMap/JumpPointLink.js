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
        const {insertJumpPointLink} = require("../../interfaces/database/insert");
        await insertJumpPointLink(this)
    }
}

exports.build = JumpPointLink
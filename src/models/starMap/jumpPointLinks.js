class JumpPointLinks {

    entryStarObject
    ExitStarObject
    name
    direction
    size

    /**
     *
     * @param {StarMapObject} entryStarMapObject
     * @param {StarMapObject} exitStarMapObject
     * @param {string} name
     * @param {char} direction
     * @param {char} size
     */
    constructor(entryStarMapObject,exitStarMapObject,name,direction,size) {
        this.entryStarMapObject = entryStarMapObject
        this.exitStarMapObject = exitStarMapObject
        this.name = name
        this.direction = direction
        this.size = size
    }

}
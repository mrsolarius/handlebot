const get = require('../../utils/xhrRequest')

module.exports = {
    async getShip(shipName){
        let url = `https://api.fleetyards.net/v1/models/${shipName.trim().toLowerCase().split(' ').join('-')}`
        let apiJSON = await get(url)
        apiJSON = JSON.parse(apiJSON)
        return apiJSON
    },
    /**
     *
     * @return {Promise<Array>}
     */
    async getAllShipsName(){
        try {
            let url = `https://api.fleetyards.net/v1/models/slugs`
            let apiJSON = await get(url)
            apiJSON = JSON.parse(apiJSON)
            return apiJSON
        } catch (e) {
            return e
        }
    }
}

const EcoleDirecte = require("../api/index"),
    session = new EcoleDirecte.Session(),
    config = require('../../config');
module.exports = {
    /**
     * Gets the users data
     * @returns session
     */
    async api() {
        return await session.connexion(config.ecoleDirecte.identifiant, config.ecoleDirecte.password);
    },
    /**
     * Gets the users data
     * @returns cahier de texte
     */
    async devoirs() {
        return this.api().then(async acc => {
            return await acc.fetchCahierDeTexte()
        })
    },
    /**
     * Gets the users data
     * @param {string} date
     * @returns data of cahier de texte
     */
    async devoi(date) {
        return this.api().then(async acc => {
            return acc.fetchDataCahierDeTexte(date);
        })
    }
}
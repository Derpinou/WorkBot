module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run() {
        this.client.logger.log(`Loading a total of ${this.client.commands.size} command(s).`, 'log');
        this.client.logger.log(`${this.client.user.tag}, ready to help`, "ready");
        let data = await this.client.functions.api()
        if (data) {
            this.client.logger.log(`Connexion effectuée avec EcoleDirecte`, "ready");
        } else this.client.logger.log(`Impossible de se connecter a l'api de ecole directe`, "error");
    }
}
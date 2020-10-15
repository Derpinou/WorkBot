module.exports = class {
    constructor(client) {
        this.client = client;
    }
    async run(error) {
        this.client.logger.log(error, "error");
    }
}
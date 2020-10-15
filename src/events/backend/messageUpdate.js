module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run(oldM, newM) {
        this.client.emit('message', newM);
    }
}
const path = require('path');
module.exports = class Command {
    constructor(client, {
        dirname = false,
        filename = false
    }) {
        let name = 'Unkown';
        if (filename) {
            name = filename.split(path.sep)[filename.split(path.sep).length - 1].replace('.js', "").toLowerCase();
        }
        let category = 'Other';
        if (dirname) {
            category = dirname.split(path.sep)[dirname.split(path.sep).length - 1];
        }
        this.client = client;
        this.conf = {};
        this.help = {name, category};
    }
}


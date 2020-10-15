const Command = require("../../structure/Command.js");
module.exports = class CMD extends Command {
    constructor (client) {
        super(client, {
            dirname: __dirname,
            filename: __filename,
        });
    }
    async run (message) {

    }
}


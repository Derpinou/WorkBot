const Command = require("../../structure/Command.js");
module.exports = class Eval extends Command {
    constructor (client) {
        super(client, {
            dirname: __dirname,
            filename: __filename,
        });
    }
    async run (message) {
        const content = message.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        return result.then(output => {
            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            if (output.includes(this.client.token)) output = output.replace(this.client.token, 'T0K3N');
            return message.channel.send(output, { code: 'js' });
        }).catch(err => {
            console.error(err);
            err = err.toString();
            return message.channel.send(err, { code: 'js' });
        });
    }

}


module.exports = class {
    constructor(client) {
        this.client = client;
    }
    run(message) {
        const prefix = this.client.config.bot.prefix,
            args = message.content.slice(prefix.length).trim().split(/ +/g),
            command = args.shift().toLowerCase(),
            cmd = this.client.commands.get(command)
        if (cmd) {
            this.client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
            return cmd.run(message, args)
        }
    }
}
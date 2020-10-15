const Command = require("../../structure/Command.js"),
    {MessageEmbed} = require('discord.js'),
    stripHtml = require("string-strip-html"),
    fetch = require('node-superfetch');
module.exports = class CMD extends Command {
    constructor (client) {
        super(client, {
            dirname: __dirname,
            filename: __filename,
        });
    }
    async run (message) {
        let client = this.client
        async function day() {
            return await client.functions.devoirs();
        }
        day().then(day => {
            day.forEach(a => {
                async function dev() {
                    return await client.functions.devoi(a.day);
                }
                dev().then(d => {
                    d.matieres.forEach(async data => {
                        let contenu = data.aFaire.contenu;
                        let buff = new Buffer.from(contenu, 'base64');
                        let text = buff.toString('ascii');
                        const { result } = stripHtml(text);
                        let resul = result;
                        if (resul.length >= 300) {
                            const {body} = await fetch.post(`https://hastebin.com/documents`).send(result);
                            resul = `[Cliquez Ici](https://hastebin.com/${body.key})`;
                        }
                        await message.channel.send(new MessageEmbed()
                            .setColor(this.client.config.bot.color)
                            .setFooter(`Donné le ${data.aFaire.donneLe}`)
                            .setAuthor(`Pour le ${d.date}`)
                            .addField("Classe:", data.entityLibelle)
                            .addField("Matiere:", data.matiere)
                            .addField("Professeur:", data.nomProf)
                            .addField("Devoir:", resul)
                        );
                    });
                });
            });
        });
    }
}


const path = require("path"),
    {readdir} = require('fs');
// Load up the discord.js library
const {Client, Collection} = require("discord.js");
module.exports = class Bot extends Client {
    constructor(options) {
        super(options);
        this.config = require("../../config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.logger = require("../utils/Logger"); // Load the logger file
        this.functions = require("../utils/functions");
    }
    async init() {
        this.commandLoader();
        this.eventLoader();
        this.login();
    }
    login() {
        return super.login(this.config.bot.token)
    }
    commandLoader() {
        readdir("./src/commands/", (err, content) => {
            if (err) console.log(err);
            if (content.length < 1) return console.log('Please create folder in "commands" folder.');
            let groups = [];
            content.forEach(element => {
                if (!element.includes('.')) groups.push(element); // If it's a folder
            });
            groups.forEach(folder => {
                readdir("./src/commands/" + folder, (e, files) => {
                    let js_files = files.filter(f => f.split(".").pop() === "js");
                    if (js_files.length < 1) return console.log('Please create files in "' + folder + '" folder.');
                    if (e) console.log(e);
                    js_files.forEach(element => {
                        const response = this.cmdLoad('../commands/' + folder, `${element}`);
                        if (response) this.logger.error(response);
                    });
                });
            });
        });
    }
    cmdLoad(commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }
    //Event Loader by zechaos
    eventLoader() {
        readdir("./src/events", (err, files) => {
            if (!files) return;
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/events/${dir}`, (err, file) => {
                    if (!file) return;
                    if (err) this.emit("error", err);
                    for (const evt of file) {
                        try {
                            if (!evt) return;
                            const event = new (require(`../events/${dir}/${evt}`))(this);
                            this.logger.log(`${evt} chargé`);
                            super.on(evt.split(".")[0], (...args) => event.run(...args));
                        } catch (e) {
                            this.emit("error", `${evt} n"a pas chargé ${e.stack}`)
                        }
                    }
                })
            }
        });
        return this
    }
}
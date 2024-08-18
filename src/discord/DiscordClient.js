const { Client } = require("discord.js");
const CommandStore = require("./commands/CommandStore");
const EventStore = require("../events/EventStore");

module.exports = function loadDiscordClient(options) {
    return DiscordClient.create(options);
};

class DiscordClient extends Client {
    static self;
    commands;

    constructor(options) {
        super(options);
    }

    static create(options) {
        if (this.self instanceof DiscordClient) {
            return this.self;
        }

        this.self = new DiscordClient(options);
        DiscordClient.loadCommands();
        DiscordClient.loadEvents();
        return this.self;
    }

    static loadCommands() {
        this.self.commands = CommandStore.read();
    }

    static loadEvents() {
        EventStore.load(this.self);
    }
}

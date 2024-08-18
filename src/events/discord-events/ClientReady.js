const Event = require("../Event");
const { Events } = require("discord.js");

module.exports = new Event()
    .setName(Events.ClientReady)
    .setOnce(true)
    .setExecute(
        function(client) {
            const user = client.user;
            console.log(`Ready! Logged in as ${user.tag}`);
            return Promise.resolve();
        }
    );

const env = require("./environment");
const Database = require("./database/Database");
const loadDiscordClient = require("./discord/DiscordClient");
const { GatewayIntentBits } = require("discord.js");

async function startUp() {
    await Database.connect();
    Database.loadModels();
    await Database.syncModels();

    const client = loadDiscordClient({ intents: [ GatewayIntentBits.Guilds ] });
    client.login(env.DISCORD_TOKEN);
}

startUp();

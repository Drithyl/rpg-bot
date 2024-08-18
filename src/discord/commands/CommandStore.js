const fs = require("fs");
const path = require("path");
const Command = require("./Command");
const env = require("../../environment");
const { Collection, REST, Routes } = require("discord.js");
const DiscordAPIResponse = require("../api/DiscordAPIResponse");
const { isNonEmptyString } = require("../../utilities/type-utilities");

module.exports = class CommandStore {
    static read() {
        const commands = new Collection();
        const foldersPath = path.join(__dirname);

        // Get an array of only directory names within the commands directory
        const commandFolders = fs.readdirSync(foldersPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                // Set a new item in the Collection with the key being the command's name
                if (command instanceof Command === false) {
                    console.warn(`The module at ${filePath} is not exporting a Command instance`);
                    continue;
                }

                commands.set(command.data.name, command);
            }
        }

        return commands;
    }

    static async deploy(commands, guildId = null) {
        const commandsJson = commands.map(command => command.data.toJSON());
        const rest = new REST().setToken(env.DISCORD_TOKEN);

        let deployRoute;

        if (isNonEmptyString(guildId) === true) {
            deployRoute = Routes.applicationGuildCommands(env.CLIENT_ID, guildId);
        }
        else {
            deployRoute = Routes.applicationCommands(env.CLIENT_ID);
        }

        console.log(`Started refreshing ${commandsJson.length} slash commands.`);
        const responseRaw = await rest.put(deployRoute, { body: commandsJson });
        const discordApiResponse = new DiscordAPIResponse(responseRaw);
        return discordApiResponse;
    }

    static async delete(guildId = null) {
        const rest = new REST().setToken(env.DISCORD_TOKEN);

        let deleteRoute;

        if (isNonEmptyString(guildId) === true) {
            console.log(`Started deleting application commands from guild ${guildId}`);
            deleteRoute = Routes.applicationGuildCommands(env.CLIENT_ID, guildId);
        }
        else {
            console.log("Started deleting application commands globally");
            deleteRoute = Routes.applicationCommands(env.CLIENT_ID);
        }

        const responseRaw = await rest.put(deleteRoute, { body: [] });
        const discordApiResponse = new DiscordAPIResponse(responseRaw);
        return discordApiResponse;
    }

    static isDeploySuccessfulResultType(result) {
        if (Array.isArray(result) === false) {
            return false;
        }

        if (result.length === 0) {
            return true;
        }

        const testItem = result[0];
        return testItem != null && typeof testItem.name === "string" && typeof testItem.description === "string";
    }
};

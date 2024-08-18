// TODO: IS THIS REALLY NEEDED?

const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");

const bodyparts = new Collection();
const bodypartsPath = path.join(__dirname, "files");
const files = fs.readdirSync(bodypartsPath);
const bodypartFiles = files.filter(file => file.endsWith(".js"));


for (const file of bodypartFiles)
{
    const filePath = path.join(bodypartsPath, file);
    const bodypart = require(filePath);

    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    bodyparts.set(command.data.name, command);
}

module.exports = bodyparts;
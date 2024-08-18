const fs = require("fs");
const path = require("path");
const Event = require("./Event");

module.exports = class EventStore {
    static load(client) {
        const foldersPath = path.join(__dirname);

        // Get an array of only directory names within the events directory
        const eventFolders = fs.readdirSync(foldersPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const folder of eventFolders) {
            const eventsPath = path.join(foldersPath, folder);
            const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

            for (const file of eventFiles) {
                const filePath = path.join(eventsPath, file);
                const event = require(filePath);

                if (event instanceof Event === false) {
                    console.warn(`The module at ${filePath} is not exporting a Event-type object`);
                    continue;
                }

                if (event.once === true) {
                    client.once(event.name, (...args) => event.execute(...args));
                }

                else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
            }
        }
    }
};

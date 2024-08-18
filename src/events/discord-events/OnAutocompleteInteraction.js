const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const { isFunction } = require("../../utilities/type-utilities");
const ChatCommand = require("../../discord/commands/ChatCommand");

module.exports = new Event()
    .setName(CUSTOM_EVENTS.ON_AUTOCOMPLETE_INTERACTION)
    .setOnce(false)
    .setExecute(
        async function(autocompleteInteraction) {
            try {
                const client = autocompleteInteraction.client;
                const command = client.commands.get(autocompleteInteraction.commandName);

                if (command instanceof ChatCommand === false) {
                    console.error(`Command with name ${autocompleteInteraction.commandName} is not an instance of ChatCommand; instead got ${command}`);
                }

                if (isFunction(command.autocomplete) === false) {
                    console.error(`Command with name ${autocompleteInteraction.commandName} does not have an autocomplete function defined; instead got ${command.autocomplete}`);
                }

                else {
                    await command.autocomplete(autocompleteInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing chat input command with name ${autocompleteInteraction.commandName}:`);
                console.error(error);
            }
	});

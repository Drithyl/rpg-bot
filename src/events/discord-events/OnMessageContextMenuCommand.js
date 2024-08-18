const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const ContextCommand = require("../../discord/commands/ContextCommand");

module.exports = new Event()
	.setName(CUSTOM_EVENTS.ON_MESSAGE_CONTEXT_MENU_COMMAND)
    .setOnce(false)
	.setExecute(
        async function(messageContextMenuCommandInteraction) {
            try {
                const client = messageContextMenuCommandInteraction.client;
                const command = client.commands.get(messageContextMenuCommandInteraction.commandName);

                if (command instanceof ContextCommand === false) {
                    console.error(`Unable to find definition for message context menu command with name ${messageContextMenuCommandInteraction.commandName}.`);
                    await messageContextMenuCommandInteraction.reply({ content: "Message context menu command could not be found.", ephemeral: true });
                }

                else {
                    await command.execute(messageContextMenuCommandInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing message context menu command with name ${messageContextMenuCommandInteraction.commandName}:`);
                console.error(error);

                if (messageContextMenuCommandInteraction.replied || messageContextMenuCommandInteraction.deferred) {
                    await messageContextMenuCommandInteraction.followUp({ content: "There was an error while executing this message context menu command.", ephemeral: true });
                }

                else {
                    await messageContextMenuCommandInteraction.reply({ content: "There was an error while executing this message context menu command.", ephemeral: true });
                }
            }
        }
    );

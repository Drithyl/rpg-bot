const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const ContextCommand = require("../../discord/commands/ContextCommand");

module.exports = new Event()
	.setName(CUSTOM_EVENTS.ON_USER_CONTEXT_MENU_COMMAND)
    .setOnce(false)
	.setExecute(
        async function(userContextMenuCommandInteraction) {
            try {
                const client = userContextMenuCommandInteraction.client;
                const command = client.commands.get(userContextMenuCommandInteraction.commandName);

                if (command instanceof ContextCommand === false) {
                    console.error(`Unable to find definition for user context menu command with name ${userContextMenuCommandInteraction.commandName}.`);
                    await userContextMenuCommandInteraction.reply({ content: "Message context menu command could not be found.", ephemeral: true });
                }

                else {
                    await command.execute(userContextMenuCommandInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing user context menu command with name ${userContextMenuCommandInteraction.commandName}:`);
                console.error(error);

                if (userContextMenuCommandInteraction.replied || userContextMenuCommandInteraction.deferred) {
                    await userContextMenuCommandInteraction.followUp({ content: "There was an error while executing this user context menu command.", ephemeral: true });
                }

                else {
                    await userContextMenuCommandInteraction.reply({ content: "There was an error while executing this user context menu command.", ephemeral: true });
                }
            }
        }
    );

const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const ChatCommand = require("../../discord/commands/ChatCommand");

module.exports = new Event()
    .setName(CUSTOM_EVENTS.ON_CHAT_INPUT_COMMAND)
    .setOnce(false)
    .setExecute(
        async function(chatInputCommandInteraction) {
            try {
                const client = chatInputCommandInteraction.client;
                const command = client.commands.get(chatInputCommandInteraction.commandName);

                if (command instanceof ChatCommand === false) {
                    console.error(`Chat Input Command with name ${chatInputCommandInteraction.commandName} is not an instance of ChatCommand; instead got ${command}`);
                    await chatInputCommandInteraction.reply({ content: "Chat input command could not be found.", ephemeral: true });
                }

                else {
                    await command.execute(chatInputCommandInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing chat input command with name ${chatInputCommandInteraction.commandName}:`);
                console.error(error);

                if (chatInputCommandInteraction.replied || chatInputCommandInteraction.deferred) {
                    await chatInputCommandInteraction.followUp({ content: "There was an error while executing this chat input command.", ephemeral: true });
                }

                else {
                    await chatInputCommandInteraction.reply({ content: "There was an error while executing this chat input command.", ephemeral: true });
                }
            }
	});

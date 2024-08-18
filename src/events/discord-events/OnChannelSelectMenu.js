const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const { isDefined } = require("../../utilities/type-utilities");

module.exports = new Event()
    .setName(CUSTOM_EVENTS.ON_CHANNEL_SELECT_MENU_INTERACTION)
    .setOnce(false)
    .setExecute(
        async function(channelSelectMenuInteraction) {
            const client = channelSelectMenuInteraction.client;
            const selectId = channelSelectMenuInteraction.customId;

            try {
                const channelSelectMenuCommand = client.commands.find(command => {
                    return isDefined(command.componentHandlers) && isDefined(command.componentHandlers[selectId]);
                });

                if (isDefined(channelSelectMenuCommand) === false) {
                    console.error(`Unable to find ChatCommand object for channel select menu with id ${selectId}.`);
                }

                else if (isDefined(channelSelectMenuCommand.componentHandlers) === false) {
                    console.error(`Unable to find definition for channel select menu handler with id ${selectId}.`);
                }

                else {
                    const channelSelectMenuHandler = channelSelectMenuCommand.componentHandlers[selectId];
                    await channelSelectMenuHandler(channelSelectMenuInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing handler with channel select menu id ${selectId}:`);
                console.error(error);
            }
        }
    );

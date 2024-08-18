const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const { isDefined } = require("../../utilities/type-utilities");

module.exports = new Event()
    .setName(CUSTOM_EVENTS.ON_STRING_SELECT_MENU_INTERACTION)
    .setOnce(false)
    .setExecute(
        async function(stringSelectMenuInteraction) {
            const client = stringSelectMenuInteraction.client;
            const selectId = stringSelectMenuInteraction.customId;

            try {
                const stringSelectMenuCommand = client.commands.find(command => {
                    return isDefined(command.componentHandlers) && isDefined(command.componentHandlers[selectId]);
                });

                if (isDefined(stringSelectMenuCommand) === false) {
                    console.error(`Unable to find ChatCommand object for string select menu with id ${selectId}.`);
                }

                else if (isDefined(stringSelectMenuCommand.componentHandlers) === false) {
                    console.error(`Unable to find definition for string select menu handler with id ${selectId}.`);
                }

                else {
                    const stringSelectMenuHandler = stringSelectMenuCommand.componentHandlers[selectId];
                    await stringSelectMenuHandler(stringSelectMenuInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing handler with string select menu id ${selectId}:`);
                console.error(error);
            }
        }
    );

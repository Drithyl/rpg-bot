const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const { isDefined } = require("../../utilities/type-utilities");

module.exports = new Event()
    .setName(CUSTOM_EVENTS.ON_BUTTON)
    .setOnce(false)
    .setExecute(
        async function(buttonInteraction) {
            const client = buttonInteraction.client;
            const buttonId = buttonInteraction.customId;

            try {
                const buttonCommand = client.commands.find(command => {
                    return isDefined(command.componentHandlers) && isDefined(command.componentHandlers[buttonId]);
                });

                if (isDefined(buttonCommand) === false) {
                    console.error(`Unable to find ChatCommand instance for button with id ${buttonId}.`);
                }

                if (isDefined(buttonCommand.componentHandlers) === false) {
                    console.warn(`Unable to find definition for button handler with id ${buttonId}. If the button is handled within the command's execute() behaviour, then this is fine.`);
                }

                else {
                    const buttonHandler = buttonCommand.componentHandlers[buttonId];
                    await buttonHandler(buttonInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing handler with button id ${buttonId}:`);
                console.error(error);
            }
        }
    );

const Event = require("../Event");
const CUSTOM_EVENTS = require("../../constants/custom-events");
const { isDefined } = require("../../utilities/type-utilities");

module.exports = new Event()
    .setName(CUSTOM_EVENTS.ON_MODAL_SUBMIT)
    .setOnce(false)
    .setExecute(
        async function(modalSubmitInteraction) {
            const client = modalSubmitInteraction.client;
            const modalId = modalSubmitInteraction.customId;

            try {
                const modalCommand = client.commands.find(command => {
                    return isDefined(command.componentHandlers) && isDefined(command.componentHandlers[modalId]);
                });

                if (isDefined(modalCommand) === false) {
                    console.error(`Unable to find ChatCommand object for modal with id ${modalId}.`);
                }

                else if (isDefined(modalCommand.componentHandlers) === false) {
                    console.error(`Unable to find definition for modal handler with id ${modalId}.`);
                }

                else {
                    const modalHandler = modalCommand.componentHandlers[modalId];
                    await modalHandler(modalSubmitInteraction);
                }
            }

            catch (error) {
                console.error(`Error occurred when executing handler with modal id ${modalId}:`);
                console.error(error);
            }
        }
    );

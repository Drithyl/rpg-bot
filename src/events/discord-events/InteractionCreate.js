const Event = require("../Event");
const { Events } = require("discord.js");
const CUSTOM_EVENTS = require("../../constants/custom-events");

module.exports = new Event()
	.setName(Events.InteractionCreate)
	.setOnce(false)
	.setExecute(
		async function(baseInteraction) {
			const client = baseInteraction.client;

			if (baseInteraction.isChatInputCommand() === true) {
				client.emit(CUSTOM_EVENTS.ON_CHAT_INPUT_COMMAND, baseInteraction);
			}

			else if (baseInteraction.isUserContextMenuCommand() === true) {
				client.emit(CUSTOM_EVENTS.ON_USER_CONTEXT_MENU_COMMAND, baseInteraction);
			}

			else if (baseInteraction.isMessageContextMenuCommand() === true) {
				client.emit(CUSTOM_EVENTS.ON_MESSAGE_CONTEXT_MENU_COMMAND, baseInteraction);
			}

			else if (baseInteraction.isAutocomplete() === true) {
				client.emit(CUSTOM_EVENTS.ON_AUTOCOMPLETE_INTERACTION, baseInteraction);
			}

			else if (baseInteraction.isButton() === true) {
				client.emit(CUSTOM_EVENTS.ON_BUTTON, baseInteraction);
			}

			else if (baseInteraction.isChannelSelectMenu() === true) {
				client.emit(CUSTOM_EVENTS.ON_CHANNEL_SELECT_MENU_INTERACTION, baseInteraction);
			}

			else if (baseInteraction.isStringSelectMenu() === true) {
				client.emit(CUSTOM_EVENTS.ON_STRING_SELECT_MENU_INTERACTION, baseInteraction);
			}

			else if (baseInteraction.isModalSubmit() === true) {
				client.emit(CUSTOM_EVENTS.ON_MODAL_SUBMIT, baseInteraction);
			}

			else {
				throw new Error(`No handler event defined for baseInteraction type: ${baseInteraction.type}`);
			}
	});

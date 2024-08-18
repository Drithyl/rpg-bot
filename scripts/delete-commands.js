const CommandStore = require("../src/discord/commands/CommandStore");

async function deleteCommands()
{
	try {
		const deleteCommandsResponse = await CommandStore.delete();
		console.log("Successfully deleted all slash commands globally. API response below:");
		console.log(deleteCommandsResponse);
	}

	catch (error) {
		console.log("Error deleting slash commands globally:");
		console.log(error);
	}
}

deleteCommands();

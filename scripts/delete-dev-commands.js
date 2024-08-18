const env = require("../src/environment");
const CommandStore = require("../src/discord/commands/CommandStore");
const { assertIsDiscordId } = require("../src/utilities/assert-utilities");

async function deleteFromGuild(devGuildId)
{
	assertIsDiscordId(devGuildId);

	try {
		const deleteCommandsResponse = await CommandStore.delete(devGuildId);
        console.log(`Successfully deleted slash commands from guild ${devGuildId}. API response below:`);
		console.log(deleteCommandsResponse);
	}

	catch (error) {
		console.log(`Error deleting slash commands from guild ${devGuildId}:`);
		console.log(error);
	}
}

deleteFromGuild(env.DEV_GUILD_ID);

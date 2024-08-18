const env = require("../src/environment");
const CommandStore = require("../src/discord/commands/CommandStore");

async function deployDevCommands(devGuildId)
{
	try {
		const commandFiles = CommandStore.read();
		const commandsDeploymentResponse = await CommandStore.deploy(commandFiles, devGuildId);

		if (commandsDeploymentResponse.success === false) {
            console.error("Something went wrong when deploying commands. Received below response.");
            console.log(commandsDeploymentResponse.data);
		}

		else {
			console.log(`Successfully reloaded ${commandsDeploymentResponse.data.length} slash commands for guild ${devGuildId}.`);
		}
	}

	catch (error) {
		console.log(`Error reloading slash commands for guild ${devGuildId}:`);
		console.log(error);
	}
}

deployDevCommands(env.DEV_GUILD_ID);

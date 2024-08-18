const env = require("../src/environment");
const CommandStore = require("../src/discord/commands/CommandStore");

async function deployCommands(devGuildId)
{
	try {
		const commandFiles = CommandStore.read();
		const userCommands = commandFiles.filter(command => command.isDevOnly === false);
		const commandsDeploymentResponse = await CommandStore.deploy(userCommands);

		if (commandsDeploymentResponse.success === false) {
            console.error("Something went wrong when deploying commands. API response below:");
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

deployCommands(env.DEV_GUILD_ID);

const ContextCommand = require("../ContextCommand");
const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = new ContextCommand()
    .setData(new ContextMenuCommandBuilder()
        .setName("User Information")
        .setType(ApplicationCommandType.User)
    )
    .setExecute(async function(userContextMenuCommandInteraction) {
        const target = userContextMenuCommandInteraction.targetUser;
        userContextMenuCommandInteraction.reply(`${target.tag} joined Discord on ${target.createdAt}`);
    });

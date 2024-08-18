const ChatCommand = require("../ChatCommand");
const {
    ActionRowBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle
} = require("discord.js");

const TARGET_OPTION_NAME = "target";
const REASON_OPTION_NAME = "reason";

const CONFIRM_BUTTON_ID = "confirm";
const CANCEL_BUTTON_ID = "cancel";

module.exports = new ChatCommand()
    .setData(new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Select a member to ban them (but not really)")
        .addUserOption(option =>
            option.setName(TARGET_OPTION_NAME)
            .setDescription("The member you (don't really) want to ban")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName(REASON_OPTION_NAME)
            .setDescription("The reason to (not really) ban the member.")
            .setRequired(false)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.KickMembers |
            PermissionFlagsBits.BanMembers
        )
    )
    .setExecute(
        async function(chatInputCommandInteraction) {
            const target = chatInputCommandInteraction.options.getUser(TARGET_OPTION_NAME);
            const reason = chatInputCommandInteraction.options.getString(REASON_OPTION_NAME) ?? "No reason provided";

            const confirmButton = new ButtonBuilder()
                .setCustomId(CONFIRM_BUTTON_ID)
                .setLabel("Confirm Ban")
                .setStyle(ButtonStyle.Danger);

            const cancelButton = new ButtonBuilder()
                .setCustomId(CANCEL_BUTTON_ID)
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Secondary);

            const buttonRow = new ActionRowBuilder()
                .addComponents(confirmButton, cancelButton);

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("This is a link inside a title!")
                .setURL("https://discord.js.org")
                .setDescription("This is a description");

            try {
                // Send response with all the embed and button components, and store the return value
                const response = await chatInputCommandInteraction.reply({
                    content: `Are you sure you want to ban ${target.tag} for reason: ${reason}?`,
                    // Messages with embeds or components can also be ephemeral
                    // (only show for the user who sent the command)
                    ephemeral: true,
                    embeds: [ embed ],
                    components: [ buttonRow ]
                });

                // Await for same user that triggered original command to press the button component.
                // This is an alternative way to receive the button responses with a set time limit.
                // It can also be handled through the componentHandlers object, as seen in modal.js
                // and in select.js, by listening to the isButton() interaction in interactionCreate.
                const confirmation = await response.awaitMessageComponent({
                    // 60 seconds is the time limit set; after that the interaction will expire
                    time: 60_000,
                    filter: (u) => {
                        return u.user.id === chatInputCommandInteraction.user.id;
                    }
                });

                // Check which button was pressed
                if (confirmation.customId === CONFIRM_BUTTON_ID) {
                    await confirmation.update({ content: `${target.username} has (not) been banned for reason: ${reason}`, components: [] });
                }

                else if (confirmation.customId === CANCEL_BUTTON_ID) {
                    await confirmation.update({ content: "Action cancelled", components: [] });
                }
            }

            catch (error) {
                // If user takes longer than the passed time, an error will be emitted, and we can edit the content to remove the components
                await chatInputCommandInteraction.editReply({ content: "Confirmation not received within 1 minute; cancelling", components: [] });
            }
        }
    );

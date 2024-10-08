const ChatCommand = require("../ChatCommand");
const {
    ActionRowBuilder,
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

const MODAL_NAME = "modal";
const COLOR_INPUT_NAME = "favouriteColourInput";
const HOBBY_INPUT_NAME = "hobbiesInput";

module.exports = new ChatCommand()
    .setData(new SlashCommandBuilder()
        .setName("modal")
        .setDescription("Pops up a modal!")
    )
    .setExecute(async function(interaction) {
        const modal = new ModalBuilder()
            // This specific modal will be identified by this id
            .setCustomId(MODAL_NAME)
            .setTitle("My Modal");

        const favouriteColourInput = new TextInputBuilder()
            .setCustomId(COLOR_INPUT_NAME)
            // The prompt that the user sees for this input box
            .setLabel("What's your favourite colour?")
            // .Short creates an input box for a single line of text
            .setStyle(TextInputStyle.Short)
            // Minimum text length
            .setMinLength(1)
            // Maximum text length
            .setMaxLength(100)
            // Placeholder shown in input field
            .setPlaceholder("Favourite colour")
            // Default value if left empty
            .setValue("None")
            // Requires a value in this field
            .setRequired(true);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId(HOBBY_INPUT_NAME)
            // The prompt that the user sees for this input box
            .setLabel("What are some of your favourite hobbies?")
            // .Paragraph creates an input box for multiple lines of text
            .setStyle(TextInputStyle.Paragraph)
            // Minimum text length
            .setMinLength(10)
            // Maximum text length
            .setMaxLength(1000);

        // Each ActionRow can only hold a single text input
        const firstActionRow = new ActionRowBuilder()
            .addComponents(favouriteColourInput);

        const secondActionRow = new ActionRowBuilder()
            .addComponents(hobbiesInput);

        // Add our rows to our modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Pop the modal up to the user
        await interaction.showModal(modal);
    })
    .setComponentHandlers({
        [MODAL_NAME]: onModalSubmitHandler,
        [COLOR_INPUT_NAME]: onFavouriteColourHandler,
        [HOBBY_INPUT_NAME]: onHobbiesHandler
    });

async function onModalSubmitHandler(modalInteraction)
{
    // Get each field by the customId we defined when creating them above
    const favouriteColourField = modalInteraction.fields.getTextInputValue(COLOR_INPUT_NAME);
    const hobbiesField = modalInteraction.fields.getTextInputValue(HOBBY_INPUT_NAME);

    // Trigger each field's behaviour
    if (favouriteColourField != null)
        await onFavouriteColourHandler(favouriteColourField);

    if (hobbiesField != null)
        await onHobbiesHandler(hobbiesField);

    // Ideally should respond to interaction so it doesn't display an error
    // Responding to a modal works just like responding to a command. If
    // the modal was popped up through a ButtonInteraction or a
    // SelectMenuInteraction, then the .update() and .deferUpdate()
    // methods will also be available, to update the text message
}

async function onFavouriteColourHandler(favouriteColourField)
{
    console.log(`Favourite colour is: ${favouriteColourField.value}`);
}

async function onHobbiesHandler(hobbiesField)
{
    console.log(`Hobbies are:\n\n${hobbiesField.value}`);
}

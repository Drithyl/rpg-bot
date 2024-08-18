const ChatCommand = require("../ChatCommand");
const {
    ActionRowBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require("discord.js");

const SELECT_NAME = "starter";

const BULBASAUR_VALUE = "bulbasaur";
const CHARMANDER_VALUE = "charmander";
const SQUIRTLE_VALUE = "squirtle";

module.exports = new ChatCommand()
    .setData(new SlashCommandBuilder()
        .setName("select")
        .setDescription("Brings up a Select menu!")
    )
    .setExecute(async function(interaction) {
        const select = new StringSelectMenuBuilder()
            // This specific select will be identified by this id
            .setCustomId(SELECT_NAME)
            .setPlaceholder("Make a selection! You can pick more than one Pokémon, actually!")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Bulbasaur")
                    .setDescription("The dual-type Grass/Poison Seed Pokémon")
                    .setValue(BULBASAUR_VALUE),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Charmander")
                    .setDescription("The Fire-type Lizard Pokémon.")
                    .setValue(CHARMANDER_VALUE),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Squirtle")
                    .setDescription("The Water-type Tiny Turtle Pokémon.")
                    .setValue(SQUIRTLE_VALUE),
            )
            .setMinValues(1)
            .setMaxValues(3);

        const row = new ActionRowBuilder()
            .addComponents(select);

        // Send the select menu to the user
        await interaction.reply({
            content: "Choose your starter!",
            components: [row]
        });
    })
    .setComponentHandlers({
        [SELECT_NAME]: OnSelectSubmitHandler
    });

async function OnSelectSubmitHandler(stringSelectMenuInteraction)
{
    // Get the values that were selected
    const selectedValues = stringSelectMenuInteraction.values;
    console.log(`User ${stringSelectMenuInteraction.user.tag} selected the following Pokémon:\n\n${selectedValues}`);

    // Respond to the user. When the reply is sent, the select menu will disappear
    await stringSelectMenuInteraction.reply({ content: `You selected the following Pokémon: ${selectedValues.join(", ")}`, ephemeral: true });
}

const path = require("path");
const dotenv = require("dotenv");
const { assertThat } = require("../utilities/assert-utilities");
const { isNonEmptyString, isDiscordId } = require("../utilities/type-utilities");

// Parse the .env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Extract all the relevant environment variables
const {
    DISCORD_TOKEN,
    CLIENT_ID,
    DEV_GUILD_ID,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_DIALECT
} = process.env;

// Perform validation checks on all the expected environment variables
assertThat(isNonEmptyString(DISCORD_TOKEN),
    `DotEnv variable DISCORD_TOKEN needs to be a Discord bot token; instead got ${DISCORD_TOKEN}`
);

assertThat(isDiscordId(CLIENT_ID),
    `DotEnv variable CLIENT_ID needs to be a Discord bot token; instead got ${CLIENT_ID}`
);

assertThat(isDiscordId(DEV_GUILD_ID),
    `DotEnv variable DEV_GUILD_ID needs to be a Discord bot token; instead got ${DEV_GUILD_ID}`
);

assertThat(isNonEmptyString(DATABASE_NAME),
    `DotEnv variable DATABASE_NAME needs to be a Discord bot token; instead got ${DATABASE_NAME}`
);

assertThat(isNonEmptyString(DATABASE_USER),
    `DotEnv variable DATABASE_USER needs to be a Discord bot token; instead got ${DATABASE_USER}`
);

assertThat(isNonEmptyString(DATABASE_PASSWORD),
    `DotEnv variable DATABASE_PASSWORD needs to be a Discord bot token; instead got ${DATABASE_PASSWORD}`
);

assertThat(isNonEmptyString(DATABASE_HOST),
    `DotEnv variable DATABASE_HOST needs to be a Discord bot token; instead got ${DATABASE_HOST}`
);

assertThat(isNonEmptyString(DATABASE_DIALECT),
    `DotEnv variable DATABASE_DIALECT needs to be a Discord bot token; instead got ${DATABASE_DIALECT}`
);


// Create our Environment object, freezing it so they remain constants
module.exports = Object.freeze({
    DISCORD_TOKEN,
    CLIENT_ID,
    DEV_GUILD_ID,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_DIALECT
});

const Command = require("./Command");
const { SlashCommandBuilder } = require("discord.js");
const assertUtilities = require("../../utilities/assert-utilities");

module.exports = class ChatCommand extends Command {
    _data;
    _autocomplete;
    _componentHandlers;

    constructor() {
        super();
    }

    get data() {
        return this._data;
    }

    get autocomplete() {
        return this._autocomplete;
    }

    get componentHandlers() {
        return this._componentHandlers;
    }

    setData(data) {
        assertUtilities.assertIsInstanceOf(data, SlashCommandBuilder);
        this._data = data;
        return this;
    }

    setAutocomplete(autocompleteFn) {
        assertUtilities.assertIsFunction(autocompleteFn);
        this._autocomplete = autocompleteFn;
        return this;
    }

    setComponentHandlers(componentHandlers) {
        assertUtilities.assertIsDefined(componentHandlers);
        assertUtilities.assertIsFunctionDictionary(componentHandlers);
        this._componentHandlers = componentHandlers;
        return this;
    }
};

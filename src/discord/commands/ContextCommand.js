const Command = require("./Command");
const { ContextMenuCommandBuilder } = require("discord.js");
const assertUtilities = require("../../utilities/assert-utilities");

module.exports = class ContextCommand extends Command {
    _data;

    constructor() {
        super();
    }

    get data() {
        return this._data;
    }

    setData(data) {
        assertUtilities.assertIsInstanceOf(data, ContextMenuCommandBuilder);
        this._data = data;
        return this;
    }
};

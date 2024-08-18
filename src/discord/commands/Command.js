const assertUtilities = require("../../utilities/assert-utilities");

module.exports = class Command {
    #_execute;
    #_isDevOnly;

    get execute() {
        return this.#_execute;
    }

    get isDevOnly() {
        return this.#_isDevOnly;
    }

    setExecute(behaviourFn) {
        assertUtilities.assertIsFunction(behaviourFn);
        this.#_execute = behaviourFn;
        return this;
    }

    setIsDevOnly(isDevOnly) {
        assertUtilities.assertIsBoolean(isDevOnly);
        this.#_isDevOnly = isDevOnly;
        return this;
    }
};

const { assertIsBoolean, assertIsFunction, assertIsString } = require("../utilities/assert-utilities");

module.exports = class Event {
    #_name;
    #_once;
    #_execute;

    get name() {
        return this.#_name;
    }

    get once() {
        return this.#_once;
    }

    get execute() {
        return this.#_execute;
    }

    setName(name) {
        assertIsString(name);
        this.#_name = name;
        return this;
    }

    setOnce(isOnceOnly) {
        assertIsBoolean(isOnceOnly);
        this.#_once = isOnceOnly;
        return this;
    }

    setExecute(behaviourFn) {
        assertIsFunction(behaviourFn);
        this.#_execute = behaviourFn;
        return this;
    }
};

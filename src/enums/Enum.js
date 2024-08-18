module.exports = class Enum {
    #value;

    get value() {
        return this.#value;
    }

    constructor(enumItemValue) {
        this.#value = enumItemValue;
    }

    static isEnum(value) {
        return value instanceof Enum;
    }
};

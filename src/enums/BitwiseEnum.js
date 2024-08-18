const Enum = require("./Enum");
module.exports = class BitwiseEnum extends Enum {
    #bitValue = 0;

    get bitValue() {
        return this.#bitValue;
    }

    constructor(bitValue) {
        super(bitValue);
        this.#bitValue = bitValue;
    }

    hasFlag(enumFlag) {
        const bitSum = this.#bitValue & enumFlag.bitValue;
        return bitSum == enumFlag.bitValue;
    }

    addFlag(...enumFlags) {
        enumFlags.forEach(tag => this.#bitValue |= tag.bitValue);
    }
};

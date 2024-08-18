const Enum = require("../../enums/Enum");
class BodypartTypes extends Enum
{
    static #enumName = "BodypartTypes";
    static Head = new BodypartTypes("head");
    static Neck = new BodypartTypes("neck");
    static Chest = new BodypartTypes("chest");
    static Arm = new BodypartTypes("arm");
    static Leg = new BodypartTypes("leg");

    constructor(tagName)
    {
        super(tagName, BodypartTypes.#enumName);
    }

    static get all()
    {
        return Enum.getAll(BodypartTypes.#enumName);
    }

    static isBodypartType(enumObject)
    {
        return enumObject instanceof BodypartTypes;
    }
}
module.exports = BodypartTypes;
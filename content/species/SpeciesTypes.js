const Enum = require("../../enums/Enum");
class SpeciesTypes extends Enum
{
    static #enumName = "SpeciesTypes";
    static Human = new SpeciesTypes("human");
    static Jotun = new SpeciesTypes("jotun");

    constructor(tagName)
    {
        super(tagName, SpeciesTypes.#enumName);
    }

    static get all()
    {
        return Enum.getAll(SpeciesTypes.#enumName);
    }

    static isSpeciesType(enumObject)
    {
        return enumObject instanceof SpeciesTypes;
    }
}
module.exports = SpeciesTypes;
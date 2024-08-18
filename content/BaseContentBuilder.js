const Enum = require("../enums/Enum");
class BaseContentBuilder
{
    #name;
    #enumClass;
    #enumType;

    constructor(EnumClass)
    {
        this.#enumClass = EnumClass;
    }

    get name() { return this.#name; }
    get type() { return this.#enumType; }

    setName(name)
    {
        if (typeof name !== "string")
            throw new Error(`Expected string; got:\n\n${name}`);

        this.#name = name;
        return this;
    }

    setType(type)
    {
        Enum.ensureEnumIsInstanceOfClass(type, this.#enumClass);

        this.#enumType = type;
        return this;
    }
}
module.exports = BaseContentBuilder;
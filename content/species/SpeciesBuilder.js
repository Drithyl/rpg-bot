const BaseContentBuilder = require("../BaseContentBuilder");
const SpeciesTypes = require("./SpeciesTypes");
const Species = require("./Species");
const Body = require("../bodyparts/Body");

class SpeciesBuilder extends BaseContentBuilder
{
    #bodyBuilder;

    constructor()
    {
        super(SpeciesTypes);
    }

    addBodyBuilder(builder)
    {
        this.#bodyBuilder = builder;
        return this;
    }

    build()
    {
        const species = new Species();
        species.body = this.#bodyBuilder();
        species.name = this.name;
        species.type = this.type;

        if (species.body instanceof Body === false)
            throw new Error("Expected instance of Body");

        return species;
    }
}
module.exports = SpeciesBuilder;
const BaseContentBuilder = require("../BaseContentBuilder");
const BodypartTypes = require("./BodypartTypes");
const Bodypart = require("./Bodypart");

class BodypartBuilder extends BaseContentBuilder
{
    constructor()
    {
        super(BodypartTypes);
    }

    build()
    {
        const bodypart = new Bodypart();
        bodypart.name = this.name;
        bodypart.type = this.type;
        return bodypart;
    }
}
module.exports = BodypartBuilder;
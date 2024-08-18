const BodypartBuilder = require("../BodypartBuilder");
const BodypartTypes = require("../BodypartTypes");

const builder = new BodypartBuilder()
    .setName("neck")
    .setType(BodypartTypes.Neck);

module.exports = builder;
const BodypartBuilder = require("../BodypartBuilder");
const BodypartTypes = require("../BodypartTypes");

const builder = new BodypartBuilder()
    .setName("head")
    .setType(BodypartTypes.Head);

module.exports = builder;
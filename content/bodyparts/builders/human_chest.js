const BodypartBuilder = require("../BodypartBuilder");
const BodypartTypes = require("../BodypartTypes");

const builder = new BodypartBuilder()
    .setName("chest")
    .setType(BodypartTypes.Chest);

module.exports = builder;
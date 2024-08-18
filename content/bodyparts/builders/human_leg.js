const BodypartBuilder = require("../BodypartBuilder");
const BodypartTypes = require("../BodypartTypes");

const builder = new BodypartBuilder()
    .setName("leg")
    .setType(BodypartTypes.Leg);

module.exports = builder;
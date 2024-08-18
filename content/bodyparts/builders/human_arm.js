const BodypartBuilder = require("../BodypartBuilder");
const BodypartTypes = require("../BodypartTypes");

const builder = new BodypartBuilder()
    .setName("arm")
    .setType(BodypartTypes.Arm);

console.log(`Arm builder name: ${builder.name}`);

module.exports = builder;
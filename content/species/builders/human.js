const SpeciesBuilder = require("../SpeciesBuilder");
const SpeciesTypes = require("../SpeciesTypes");
const Body = require("../../bodyparts/Body");

const humanArm = require("../../bodyparts/builders/human_arm");
const humanChest = require("../../bodyparts/builders/human_chest");
const humanHead = require("../../bodyparts/builders/human_head");
const humanLeg = require("../../bodyparts/builders/human_leg");
const humanNeck = require("../../bodyparts/builders/human_neck");

const builder = new SpeciesBuilder()
    .setName("human")
    .setType(SpeciesTypes.Human)
    .addBodyBuilder(buildBody);

module.exports = builder;

function buildBody()
{
    const leftArm = humanArm.build();
    const rightArm = humanArm.build();
    const chest = humanChest.build();
    const head = humanHead.build();
    const leftLeg = humanLeg.build();
    const rightLeg = humanLeg.build();
    const neck = humanNeck.build();

    return new Body()
        .addBodypart(head)
            .connectTo(neck)
        .addBodypart(neck)
            .connectTo(head)
            .connectTo(chest)
        .addBodypart(chest)
            .connectTo(neck)
            .connectTo(leftArm)
            .connectTo(rightArm)
            .connectTo(leftLeg)
            .connectTo(rightLeg)
        .addBodypart(leftArm)
            .connectTo(chest)
        .addBodypart(rightArm)
            .connectTo(chest)
        .addBodypart(leftLeg)
            .connectTo(chest)
        .addBodypart(rightLeg)
            .connectTo(chest)
        .finish();
}
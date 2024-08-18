const fs = require("node:fs");
const path = require("node:path");
const SpeciesTypes = require("./SpeciesTypes");

const speciesLibrary = new Map();
loadSpeciesFiles();


module.exports.getBuilder = (key) =>
{
    if (SpeciesTypes.isSpeciesType(key) === true)
        return getBuilderByType(key);

    return getBuilderByName(key);
};


function getBuilderByType(speciesType)
{
    const builder = speciesLibrary.get(speciesType);

    if (builder == null)
        throw new Error(`Species with type <${speciesType}> not found.`);

    return builder;
}

function getBuilderByName(name)
{
    const speciesType = [ ...speciesLibrary.keys()].find(type =>
        type.name === name
    );

    const builder = speciesLibrary.get(speciesType);

    if (builder == null)
        throw new Error(`Species with name <${name}> not found.`);

    return builder;
}


function loadSpeciesFiles()
{
    const speciesPath = path.join(__dirname, "builders");
    const files = fs.readdirSync(speciesPath);
    const speciesFiles = files.filter(file => file.endsWith(".js"));


    for (const file of speciesFiles)
    {
        const filePath = path.join(speciesPath, file);
        const speciesBuilder = require(filePath);
        console.log(speciesBuilder);

        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        speciesLibrary.set(speciesBuilder.type, speciesBuilder);
    }
}
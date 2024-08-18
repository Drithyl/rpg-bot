const assertUtilities = require("../utilities/assert-utilities");

module.exports = class ModelData {
    #_name;
    #_columns = {};
    #_associations = {
        belongsTo: [],
        belongsToMany: [],
        hasOne: [],
        hasMany: [],
    };

    get name() {
        return this.#_name;
    }

    get columns() {
        return Object.assign({}, this.#_columns);
    }

    get associations() {
        return Object.assign({}, this.#_associations);
    }

    setName(name) {
        assertUtilities.assertStringIsNotEmpty(name);
        this.#_name = name;
        return this;
    }

    setColumns(columnData) {
        assertUtilities.assertIsDefined(columnData);
        this.#_columns = Object.assign({}, columnData);
        return this;
    }

    belongsTo(modelName, options) {
        this.#_associations.belongsTo.push({
            modelName,
            options
        });
        return this;
    }

    belongsToMany(modelName, options) {
        this.#_associations.belongsToMany.push({
            modelName,
            options
        });
        return this;
    }

    hasOne(modelName, options) {
        this.#_associations.hasOne.push({
            modelName,
            options
        });
        return this;
    }

    hasMany(modelName, options) {
        this.#_associations.hasMany.push({
            modelName,
            options
        });
        return this;
    }
};

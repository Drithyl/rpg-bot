const env = require("../environment");
const Sequelize = require("sequelize");
const ModelData = require("./ModelData");
const { isNonEmptyArray } = require("../utilities/type-utilities");

// Static class not meant to be initialized. It will handle all our storage needs.
module.exports = class Database {
	static #_connection = this.#_initializeConnection();
	static models = {};

	// Initialize the database connection with the .env information
	static #_initializeConnection() {
		return new Sequelize(
			env.DATABASE_NAME,
			env.DATABASE_USER,
			env.DATABASE_PASSWORD,
			{
				host: env.DATABASE_HOST,
				dialect: env.DATABASE_DIALECT,
				logging: false,
				// Name of the database file when using sqlite as dialect
				storage: "database.sqlite",
			},
		);
	}

	// Use this function as an interface to return the actual private connection
	// object. This forces clients of this class to always test the connection
	// first through the private #_connect() method.
	static async connect() {
		await this.#_connect();
		return this.#_connection;
	}

	// Connect to the database using the initialized connection object.
	// This should be called first before every use of the connected
	// object, since it also tests if the connection is still OK.
	static async #_connect() {
		try {
			await this.#_connection.authenticate();
			console.log("Database connection has been established successfully.");
		}
		catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}

	// Closes the connection to the database. Once this is called,
	// the sequelize object needs to be recreated from scratch
	static closeConnection() {
		this.#_connection.close();
	}

	// Load all of our model files and synchronize them with the database
	static loadModels() {
		const path = require("node:path");
		const fs = require("node:fs");

		// Iterate through all our model files and create them in the database
		const modelsPath = path.join(__dirname, "models");
		const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith(".js"));

		// Use the data to initialize the actual model objects
		for (const file of modelFiles) {
			const filePath = path.join(modelsPath, file);
			this.#loadModelData(filePath);
		}

		// Once model objects are defined, load the associations between each other
		// i.e. model A has many B, A belongs to C, etc.
		this.#loadModelAssociations();
	}

	static async syncModels() {
		// Creates the models in the database if they don't exist,
		// or syncs their local data with the db otherwise
		await this.#_connection.sync({ alter: true });
	}

	static async forEvery(modelName, filterObj) {
		const models = await this.models[modelName].findAll(filterObj);
		return {
			invoke: async function(fn) {
				for (const model of models) {
					await fn(model);
				}
			},
		};
	}

	static #loadModelData(filePath) {
		const modelData = require(filePath);
		const modelName = modelData.name;

		// Incorrect model structure
		if (modelData instanceof ModelData === false) {
			console.error(`Expected modelData to be an instance of ${ModelData.name}, instead got ${modelData}`);
			return;
		}

		// Define the model in sequelize using its data structure
		const model = this.#_connection.define(modelName, {
			...modelData.columns,
		});

		model.associations = modelData.associations;
		this.models[modelName] = model;
	}

	static #loadModelAssociations() {
		for (const name in this.models) {
			const model = this.models[name];
			const associations = model.associations || {};
			const belongsTo = associations.belongsTo;
			const belongsToMany = associations.belongsToMany;
			const hasOne = associations.hasOne;
			const hasMany = associations.hasMany;

			if (isNonEmptyArray(belongsTo) === true) {
				belongsTo.forEach((b) => {
					const otherModel = this.models[b.modelName];

					if (otherModel instanceof Sequelize.Model !== true) {
						console.warn(`Other model ${b.modelName} is not an instance of Sequelize.Model; cannot load ${name}.belongsTo() association`);
					}
					else {
						model.belongsTo(otherModel, b.options);
					}
				});
			}

			if (isNonEmptyArray(belongsToMany) === true) {
				belongsToMany.forEach((b) => {
					const otherModel = this.models[b.modelName];

					if (otherModel instanceof Sequelize.Model !== true) {
						console.warn(`Other model ${b.modelName} is not an instance of Sequelize.Model; cannot load ${name}.belongsToMany() association`);
					}
					else {
						model.belongsToMany(otherModel, b.options);
					}
				});
			}

			if (isNonEmptyArray(hasOne) === true) {
				hasOne.forEach((h) => {
					const otherModel = this.models[h.modelName];

					if (otherModel instanceof Sequelize.Model !== true) {
						console.warn(`Other model ${h.modelName} is not an instance of Sequelize.Model; cannot load ${name}.hasOne() association`);
					}
					else {
						model.hasOne(otherModel, h.options);
					}
				});
			}

			if (isNonEmptyArray(hasMany) === true) {
				hasMany.forEach((h) => {
					const otherModel = this.models[h.modelName];

					if (otherModel instanceof Sequelize.Model !== true) {
						console.warn(`Other model ${h.modelName} is not an instance of Sequelize.Model; cannot load ${name}.hasMany() association`);
					}
					else {
						model.hasMany(otherModel, h.options);
					}
				});
			}
		}
	}
};

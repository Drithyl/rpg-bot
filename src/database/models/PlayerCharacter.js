const Sequelize = require("sequelize");
const ModelData = require("../ModelData");
const { PLAYER_CHARACTER, PLAYER } = require("../../constants/models");

module.exports = new ModelData()
	.setName(PLAYER_CHARACTER)
	.setColumns({
		name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				is: /^[A-Za-z0-9-_]{3,32}$/,
			},
		},
	})
	.belongsTo(PLAYER);

const Sequelize = require("sequelize");
const ModelData = require("../ModelData");
const { PLAYER, PLAYER_CHARACTER } = require("../../constants/models");
const { SET_NULL, CASCADE } = require("../../constants/model-options");

module.exports = new ModelData()
	.setName(PLAYER)
	.setColumns({
		discordId: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				is: /^\d{17,19}$/,
			},
		},
	})
	.hasMany(
		PLAYER_CHARACTER,
		{
			foreignKey: "discordId",
			onDelete: SET_NULL,
			onUpdate: CASCADE,
		}
	);

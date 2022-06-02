const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const responseSchema = new Schema(
	{
		createdAt: Number,
		updatedAt: Number,
		answers: [
			{
				_id: false,
				questionId: String,
				answer: [
					{
						content: String,
						_id: false,
					},
				],
			},
		],
	},
	{
		timestamps: {
			currentTime: () => dayjs().unix(),
		},
	}
);

module.exports = mongoose.model("Response", responseSchema);

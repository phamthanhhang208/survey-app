const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
	createdAt: Date,
	answers: [
		{
			questionId: ObjectId,
			questionText: String,
			answer: [
				{
					options: {
						optionText: String,
					},

					choices: [
						{
							choiceText: String,
						},
					],
					input: String,
				},
			],
		},
	],
});

module.exports = mongoose.model("Response", responseSchema);

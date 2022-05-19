const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
	createdAt: Date,
	answers: [
		{
			_id: false,
			questionText: String,
			answer: [
				{
					content: String,
					_id: false,
				},
			],
		},
	],
});

module.exports = mongoose.model("Response", responseSchema);

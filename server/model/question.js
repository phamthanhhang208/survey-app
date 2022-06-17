const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionValidateSchema = new Schema(
	{
		type: String,
		length: Number,
		message: String,
	},
	{ _id: false }
);

const questionSchema = new Schema({
	questionText: String,
	type: String,
	requried: Boolean,
	description: String,
	validator: {
		type: questionValidateSchema,
	},
	answer: [
		{
			_id: false,
			content: String,
		},
	],
});

module.exports = mongoose.model("Question", questionSchema);

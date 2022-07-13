const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionValidateSchema = new Schema(
	{
		type: String,
		operations: String,
		min: Number,
		max: Number,
		pattern: String,
		message: String,
	},
	{ _id: false }
);

const ImageSchema = new Schema(
	{
		url: String,
		filename: String,
	},
	{ _id: false }
);

const questionSchema = new Schema({
	questionText: String,
	questionMedia: { type: ImageSchema },
	type: String,
	required: Boolean,
	description: String,
	validator: {
		type: questionValidateSchema,
	},
	answer: [
		{
			_id: false,
			content: {
				type: String,
				default: "",
			},
			media: { type: ImageSchema },
		},
	],
});

module.exports = mongoose.model("Question", questionSchema);

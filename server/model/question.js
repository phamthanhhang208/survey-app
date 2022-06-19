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

const ImageSchema = new Schema({
	url: String,
	filename: String,
});

const questionSchema = new Schema({
	questionText: String,
	questionMedia: { ImageSchema },
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
			media: { ImageSchema },
		},
	],
});

module.exports = mongoose.model("Question", questionSchema);

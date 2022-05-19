const mongoose = require("mongoose");
//const Response = require("./response");
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

const formSchema = new Schema({
	title: String,
	lastUpdate: Date,
	createdAt: Date,
	description: String,
	questions: [questionSchema],
	responses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Response",
		},
	],
});

module.exports = mongoose.model("Form", formSchema);

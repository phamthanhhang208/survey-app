const mongoose = require("mongoose");
//const Response = require("./response");
const Schema = mongoose.Schema;

const formSchema = new Schema({
	title: String,
	lastUpdate: Date,
	createdAt: Date,
	description: String,
	questions: [
		{
			questionId: ObjectId,
			questionText: String,
			type: String,
			requried: Boolean,
			description: String,
			validator: {
				type: String,
				length: Number,
				message: String,
			},
			//questionImg: String, //upload or link?
			answer: [
				{
					options: [
						{
							optionText: String,
						},
					],
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
	responses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Response",
		},
	],
});

module.exports = mongoose.model("Form", formSchema);

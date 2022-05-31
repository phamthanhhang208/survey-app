const mongoose = require("mongoose");
const dayjs = require("dayjs");
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

const formSchema = new Schema(
	{
		title: String,
		createdAt: Number,
		updatedAt: Number,
		description: String,
		questions: [questionSchema],
		responses: [
			{
				type: Schema.Types.ObjectId,
				ref: "Response",
			},
		],
	},
	{
		timestamps: {
			currentTime: () => dayjs().unix(),
		},
	}
);

module.exports = mongoose.model("Form", formSchema);

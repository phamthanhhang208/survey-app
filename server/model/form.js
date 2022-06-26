const mongoose = require("mongoose");
const dayjs = require("dayjs");
const Schema = mongoose.Schema;

const formSchema = new Schema(
	{
		title: String,
		createdAt: Number,
		updatedAt: Number,
		description: String,
		questions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Question",
			},
		],
		responses: [
			{
				type: Schema.Types.ObjectId,
				ref: "Response",
			},
		],
		isAcceptResponse: {
			type: Boolean,
			default: true,
		},
		isAllowAnonymous: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: {
			currentTime: () => dayjs().unix(),
		},
	}
);

formSchema.post("findByIdAndDelete", async function (doc) {
	if (doc) {
		await Response.deleteMany({
			_id: {
				$in: doc.responses,
			},
		});
		await Question.deleteMany({
			_id: {
				$in: doc.questions,
			},
		});
	}
});

module.exports = mongoose.model("Form", formSchema);

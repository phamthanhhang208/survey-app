//const ObjectId = require("mongoose").Types.ObjectId;

module.exports.validateQuestionMedia = async (req, res, next) => {
	const { questionId } = req.params;
	const img = req.body;
	const question = await Question.find({
		$and: [
			{ _id: questionId },
			{
				$or: [
					{ "questionMedia.filename": img.filename },
					{ "answer.media.filename": img.filename },
				],
			},
		],
	});

	if (question.length === 0)
		return next(
			new Error("This media does not belong or does not exist in this question")
		);
	return next();
};

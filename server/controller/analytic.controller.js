const Form = require("../model/form");
const Response = require("../model/response");
const Question = require("../model/question");

module.exports.getAnalytics = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const { responses, questions } = form;
	const questionsContext = await Question.aggregate([
		{
			$match: {
				_id: {
					$in: questions,
				},
			},
		},
	]);
	const pipeline = [
		{
			$match: {
				_id: {
					$in: responses,
				},
			},
		},
		{
			$unwind: "$answers",
		},
		{
			$group: {
				_id: "$answers.questionId",
				responses: {
					$push: "$answers.answer",
				},
			},
		},
		{
			$unwind: "$responses",
		},
		{
			$unwind: "$responses",
		},
		{
			$group: {
				_id: {
					q: "$_id",
					r: "$responses.content",
				},
				count: {
					$sum: 1,
				},
				records: {
					$first: "$records",
				},
			},
		},
		{
			$group: {
				_id: "$_id.q",
				responses: {
					$push: {
						content: "$_id.r",
						count: "$count",
					},
				},
				records: {
					$sum: "$count",
				},
			},
		},
	];
	const analytic = await Response.aggregate(pipeline);

	const result = questionsContext.map((question) => {
		const { questionText, description, type, required, answer, _id } = question;
		let obj = analytic.find((o) => o._id === question._id.toString());
		if (!obj) {
			obj = { records: 0, responses: [] };
		}
		return { _id, questionText, description, type, required, answer, ...obj };
	});

	return res.status(200).send(result);
};

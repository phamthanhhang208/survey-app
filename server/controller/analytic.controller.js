const Form = require("../model/form");
const Response = require("../model/response");

module.exports.getAnalytics = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const { responses, questions } = form;
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
				records: {
					$sum: 1,
				},
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
					$first: "$records",
				},
			},
		},
	];
	const analytic = await Response.aggregate(pipeline);

	const result = questions.map((question) => {
		const { questionText, description, type, required, answer, _id } = question;
		let obj = analytic.find((o) => o._id === question._id.toString());
		if (!obj) {
			obj = { records: 0, responses: [] };
		}
		return { _id, questionText, description, type, required, answer, ...obj };
	});

	return res.status(200).send(result);
};

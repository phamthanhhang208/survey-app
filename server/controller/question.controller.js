const Form = require("../model/form");
// add array of questions
module.exports.addQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const questions = req.body;
	form.questions.push(...questions);
	await form.save();
	return res.status(200).send("added questions");
};

// add a question
module.exports.addQuestion = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const question = req.body;
	form.questions.push(question);
	await form.save();
	return res.status(200).send("added question");
};

// update a question

module.exports.editQuestion = async (req, res, next) => {
	const questionId = req.params.questionId;
	const question = req.body;
	const form = await Form.findOneAndUpdate(
		{
			_id: req.params.id,
			"questions._id": questionId,
		},
		{
			$set: {
				"questions.$": question,
			},
		}
	);

	return res.status(200).send(form);
};

// delete a question

module.exports.deleteQuestion = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const questionId = req.params.questionId;
	form.questions.id(questionId).remove();
	await form.save();
	return res.status(200).send("question deleted");
};

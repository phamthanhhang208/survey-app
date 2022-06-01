const Form = require("../model/form");
// add array of questions
module.exports.addQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const questions = req.body;
	form.questions.push(...questions);
	// get new question's id
	const questionsId = form.questions.filter((q) => q.isNew).map((q) => q._id);
	//push to order array
	form.order.push(...questionsId);
	//save form
	await form.save();

	return res.status(200).send("added questions");
};

// add a question
module.exports.addQuestion = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const question = req.body;
	form.questions.push(question);
	const questionId = form.questions[form.questions.length - 1]._id;
	form.order.push(questionId);
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
	//delete from db
	form.questions.id(questionId).remove();
	// remove from order
	const index = form.order.indexOf(questionId);
	if (index > -1) {
		form.order.splice(index, 1);
	}
	// save form
	await form.save();
	return res.status(200).send("question deleted");
};

// reorder all order array
module.exports.reorderQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const reorderList = req.body;
	form.order = reorderList;
	await form.save();
	return res.status(200).send("reordered question");
};

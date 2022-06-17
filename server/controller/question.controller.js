const Form = require("../model/form");
const Response = require("../model/response");
const Question = require("../model/question");
// add array of questions
module.exports.addQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const questions = await Question.insertMany(req.body);
	//const questions = req.body;

	//form.questions.push(...questions);
	// get new question's id
	const questionsId = questions.map((q) => q._id);
	//push to order array
	form.questions.push(...questionsId);
	//save form
	await form.save();

	return res.status(200).send("added questions");
};

// add a question
module.exports.addQuestion = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const question = new Question(req.body);
	//console.log(question);
	form.questions.push(question);
	//const questionId = form.questions[form.questions.length - 1]._id;
	//form.order.push(questionId);
	await question.save();
	await form.save();

	return res.status(200).send("added question");
};

// update a question

module.exports.editQuestion = async (req, res, next) => {
	// const questionId = req.params.questionId;
	// const question = req.body;
	// const form = await Form.findOneAndUpdate(
	// 	{
	// 		_id: req.params.id,
	// 		"questions._id": questionId,
	// 	},
	// 	{
	// 		$set: {
	// 			"questions.$": question,
	// 		},
	// 	},
	// 	{
	// 		new: true,
	// 	}
	// );
	const { questionId } = req.params;
	const q = await Question.findByIdAndUpdate(questionId, req.body, {
		new: true,
	});

	return res.status(200).send(q);
};

// delete a question

module.exports.deleteQuestion = async (req, res, next) => {
	const { id, questionId } = req.params;
	//const form = await Form.findById(id);
	await Question.findByIdAndDelete(questionId);
	await Form.findByIdAndUpdate(id, { $pull: { questions: questionId } });

	//delete from db
	//form.questions(questionId).remove();
	// remove from order
	// const index = form.questions.indexOf(questionId);
	// if (index > -1) {
	// 	form.questions.splice(index, 1);
	// }
	// save form
	//await form.save();
	//delete all answers in response
	await Response.updateMany({}, { $pull: { answers: { questionId } } });

	return res.status(200).send("question deleted");
};

// reorder all order array
module.exports.reorderQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const reorderList = req.body;
	form.questions = reorderList;
	await form.save();
	return res.status(200).send("reordered question");
};

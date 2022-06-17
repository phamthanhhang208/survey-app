const Form = require("../model/form");
const Question = require("../model/question");

exports.validateFormId = async (req, res, next) => {
	const { id } = req.params;
	const form = await Form.findById(id);
	if (!form) return next(new Error("form not found"));
	return next();
};

exports.validateQuesionId = async (req, res, next) => {
	const { id, questionId } = req.params;
	//const question = await Form.findOne({ _id: id, "questions": questionId });
	const q = await Question.findById(questionId);
	if (!q) return next(new Error("question not found"));
	return next();
};

exports.validateAllQuestionIds = async (req, res, next) => {
	const { id } = req.params;
	const ids = req.body;
	const form = await Form.findById(id);
	const questionIds = form.questions.map((q) => q.toString());
	if (ids.length !== questionIds.length)
		return next(new Error("array does not equal"));
	const isOrderCorrect = ids.every((q) => questionIds.includes(q));
	if (!isOrderCorrect) return next(new Error("wrong ids"));
	return next();
};

exports.validateResponseQuestionId = async (req, res, next) => {
	const { id } = req.params;
	const answers = req.body.answers;
	const ids = answers.map((a) => a.questionId);
	const form = await Form.findById(id);
	if (!form) return next(new Error("form not found"));
	const questionIds = form.questions.map((q) => q.toString());
	const isQuestionCorrect = ids.every((q) => questionIds.includes(q));
	if (!isQuestionCorrect) return next(new Error("wrong ids"));
	return next();
};

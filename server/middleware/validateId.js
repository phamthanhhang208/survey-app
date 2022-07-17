const Form = require("../model/form");
const Question = require("../model/question");
const AppError = require("../helper/AppError");
const ObjectId = require("mongoose").Types.ObjectId;
const Response = require("../model/response");

//validate form id
exports.validateFormId = async (req, res, next) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) return next(new AppError(404, "Invalid Form"));
	const form = await Form.findById(id);
	if (!form)
		return next(new AppError(404, "The form is not found or does not exist"));
	req.form = form;
	return next();
};

// for edit and delete question
exports.validateQuesionId = async (req, res, next) => {
	const { questionId } = req.params;
	if (!ObjectId.isValid(questionId))
		return next(new AppError(404, "Invalid Question"));
	//const question = await Form.findOne({ _id: id, questions: questionId });
	const q = await Question.findById(questionId);
	if (!q)
		return next(new AppError(404, "Question is not found or does not exist"));
	return next();
};

//check if reorder form question id is correct
exports.validateAllQuestionIds = async (req, res, next) => {
	//const { id } = req.params;
	const ids = req.body;
	//const form = await Form.findById(id);
	const questionIds = req.form.questions.map((q) => q.toString());
	//check if there is enough question
	if (ids.length !== questionIds.length)
		return next(new AppError(404, "Question is not found or does not exist"));
	//check if every ids exist in form
	const isOrderCorrect = ids.every((q) => questionIds.includes(q));
	if (!isOrderCorrect)
		return next(new AppError(404, "Question is not found or does not exist"));
	return next();
};

// check if every response question id belong or exist in form
exports.validateResponseQuestionId = async (req, res, next) => {
	//const { id } = req.params;
	if (!ObjectId.isValid(id)) return next(new AppError(404, "Invalid Form"));
	//check if form exist
	// const form = await Form.findById(id);
	// if (!form) return next(new Error("form not found"));

	const answers = req.body.answers;
	const ids = answers.map((a) => a.questionId);
	const questionIds = req.form.questions.map((q) => q.toString());

	//check if every answer question id exist in form
	const isQuestionCorrect = ids.every((q) => questionIds.includes(q));
	if (!isQuestionCorrect)
		return next(new AppError(404, "Question is not found or does not exist"));
	return next();
};

// validate response Id

exports.validateResponseId = async (req, res, next) => {
	const { responseId, id } = req.params;
	if (!ObjectId.isValid(responseId))
		return next(new AppError(404, "Invalid Response"));
	const response = await Response.findById(responseId);
	//const formResponse = Form.findOne({_id: id, responses:responseId})
	//const formResponse = req.form.responses.includes(responseId)
	if (!response) return next(new AppError(404, "Invalid Response"));
	return next();
};

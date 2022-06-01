const {
	validateQuestion,
	validateForm,
	validateQuestions,
	validateFormEdit,
} = require("../helper/validator");

exports.validateQuiz = (req, res, next) => {
	const isValid = validateQuestion(req.body);
	if (!isValid) return next(validateQuestion.errors);
	return next();
};

exports.validationQuestionList = (req, res, next) => {
	const isValid = validateQuestions(req.body);
	if (!isValid) return next(validateQuestions.errors);
	return next();
};

exports.validateFormInput = (req, res, next) => {
	const isValid = validateForm(req.body.form);
	if (!isValid) return next(validateForm.errors);
	return next();
};

exports.validateFormEditInput = (req, res, next) => {
	const isValid = validateFormEdit(req.body.form);
	if (!isValid) return next(validateFormEdit.errors);
	return next();
};

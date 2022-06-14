const {
	validateQuestion,
	validateForm,
	validateQuestions,
	validateResponse,
} = require("../helper/validateJson");

exports.validateQuestionInput = (req, res, next) => {
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
	const isValid = validateForm(req.body);
	if (!isValid) return next(validateForm.errors);
	return next();
};

exports.validationResponseInput = (req, res, next) => {
	const isValid = validateResponse(req.body);
	if (!isValid) return next(validateResponse.errors);
	return next();
};

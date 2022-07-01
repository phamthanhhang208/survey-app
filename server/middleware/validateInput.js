const {
	validateQuestion,
	validateForm,
	validateQuestions,
	validateResponse,
} = require("../helper/validateJson");
const AppError = require("../helper/AppError");

exports.validateQuestionInput = (req, res, next) => {
	const isValid = validateQuestion(req.body);
	if (!isValid) {
		console.log(validateQuestion.errors);
		return next(new AppError(400));
	}
	return next();
};

exports.validationQuestionList = (req, res, next) => {
	const isValid = validateQuestions(req.body.questions);
	if (!isValid) {
		console.log(validateQuestions.errors);
		return next(new AppError(400));
	}
	return next();
};

exports.validateFormInput = (req, res, next) => {
	const isValid = validateForm(req.body);
	if (!isValid) {
		console.log(validateForm.errors);
		return next(new AppError(400));
	}
	return next();
};

exports.validationResponseInput = (req, res, next) => {
	const isValid = validateResponse(req.body);
	if (!isValid) {
		console.log(validateResponse.errors);
		return next(new AppError(400));
	}
	return next();
};

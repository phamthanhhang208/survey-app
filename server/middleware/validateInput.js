const { validateQuestion, validateForm } = require("../helper/validator");

exports.validateQuiz = (req, res, next) => {
	const isValid = validateQuestion(req.body);
	if (!isValid) return next(validateQuestion.errors);
	return next();
};

exports.validateFormInput = (req, res, next) => {
	const isValid = validateForm(req.body.form);
	if (!isValid) return next(validateForm.errors);
	return next();
};

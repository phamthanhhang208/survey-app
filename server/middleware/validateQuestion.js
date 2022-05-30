const { validateQuestion } = require("../helper/validator");

exports.validateQuiz = (req, res, next) => {
	const isValid = validateQuestion(req.body);
	if (!isValid) return next(validateQuestion.errors);
	return next();
};

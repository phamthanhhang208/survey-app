const Form = require("../model/form");
const { CHECKBOXES, MULTIPLECHOICE } = require("../constant/question");
const { validateAnswerSchema } = require("../helper/validateAnswer");
const { isContain } = require("../helper/utils");

exports.isAnswerExist = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const { answers } = req.body;
	for (let i = 0; i < answers.length; i++) {
		const question = form.questions.id(answers[i].questionId);
		if (question.type == CHECKBOXES || question.type == MULTIPLECHOICE) {
			//check if answer exist in db
			const result = isContain(question.answer, answers[i].answer);
			if (!result) return next(new Error("answer does not exist"));
			continue;
		} else {
			continue;
		}
	}
	next();
};

exports.validateAnswer = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const { answers } = req.body;
	for (let i = 0; i < answers.length; i++) {
		const question = form.questions.id(answers[i].questionId);
		const { validator } = question;
		if (!validator) continue;
		const isAnswerValid = validateAnswerSchema(validator, answers[i].answer);
		if (!isAnswerValid) {
			continue;
			//return next(new Error("answer is not valid"));
		} else {
			continue;
		}
	}
	next();
};

const AppError = require("../helper/AppError");
const Question = require("../model/question");
const {
	CHECKBOXES,
	MULTIPLECHOICE,
	SHORT,
	PARAGRAPH,
} = require("../constant/question");
const { validatorAnswer } = require("../helper/validateAnswer");
const { isContain } = require("../helper/utils");
//const _ = require("lodash");

const defaultValidator = {
	type: "array",
	max: 1,
	min: 1,
	message: "This question require 1 answer only",
};

exports.isAnswerExist = async (req, res, next) => {
	const { answers } = req.body;
	for (let i = 0; i < answers.length; i++) {
		const question = await Question.findById(answers[i].questionId);
		const { _doc: questionContent } = question;
		if (question.type == CHECKBOXES || question.type == MULTIPLECHOICE) {
			//check if answer array exist in db
			const result = isContain(questionContent.answer, answers[i].answer);
			if (!result) return next(new AppError(404, "The answer does not exist"));
			continue;
		} else {
			continue;
		}
	}
	next();
};

exports.validateAnswer = async (req, res, next) => {
	const { answers } = req.body;
	for (let i = 0; i < answers.length; i++) {
		const question = await Question.findById(answers[i].questionId);
		// get question validator
		const { validator } = question;

		switch (question.type) {
			default:
				break;
			case PARAGRAPH:
			case SHORT:
			case MULTIPLECHOICE:
				validateAnswerType(
					answers[i].answer,
					defaultValidator,
					next,
					"This question require 1 answer only"
				);
				if (!validator) break;
				validateAnswerType(answers[i].answer[0].content, validator._doc, next);
				break;
			case CHECKBOXES:
				if (!validator) break;
				validateAnswerType(answers[i].answer, validator._doc, next);
				break;
		}

		// check if every question have enough answer
		// if (
		// 	question.type === SHORT ||
		// 	question.type === PARAGRAPH ||
		// 	question.type === MULTIPLECHOICE
		// ) {
		// 	const isAnswerLengthCorrect = validatorAnswer(answers[i].answer, {
		// 		...defaultValidator,
		// 	});
		// 	if (!isAnswerLengthCorrect) {
		// 		return next(new AppError(400, "This question require 1 answer only"));
		// 	}
		// }
		//skip if there is no validator
		//if (!validator) continue;
		// validate answer if there is validator
		// if (question.type === CHECKBOXES) {
		// 	const isAnswerLengthCorrect = validatorAnswer(answers[i].answer, {
		// 		...validator._doc,
		// 	});
		// 	if (!isAnswerLengthCorrect) {
		// 		return next(
		// 			new AppError(
		// 				400,
		// 				validator?.message || "This question require 1 answer only"
		// 			)
		// 		);
		// 	}
		// }
		// if (question.type === SHORT || question.type === PARAGRAPH) {
		// 	for (const answer of answers[i].answer) {
		// 		const isAnswerValid = validatorAnswer(answer.content, {
		// 			...validator._doc,
		// 		});
		// 		if (!isAnswerValid) {
		// 			return next(
		// 				new AppError(400, validator?.message || "answer is not valid")
		// 			);
		// 		} else {
		// 			continue;
		// 		}
		// 	}
		// }
	}
	next();
};

const validateAnswerType = (
	answer,
	validator,
	next,
	message = "The answer is not valid"
) => {
	const isAnswerValid = validatorAnswer(answer, {
		...validator,
	});
	if (!isAnswerValid) {
		return next(new AppError(400, validator?.message || message));
	} else {
		return;
	}
};

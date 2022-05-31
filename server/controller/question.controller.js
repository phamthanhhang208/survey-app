const Form = require("../model/form");
// add array of questions
module.exports.addQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const questions = req.body;
	form.questions.push(...questions);
	await form.save();
	return res.status(200).send("added question");
};

// update a question

// delete a question

const Form = require("../model/form");

module.exports.addQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const questions = req.body;
	form.responses.push(...questions);
	await form.save();
	return res.status(200).send("added question");
};

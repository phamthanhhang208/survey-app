const Form = require("../model/form");
const Question = require("../model/question");

// create a new form and a question
module.exports.createForm = async (req, res, next) => {
	const form = new Form(req.body);
	const demoQuestion = {
		questionText: "Untitle question",
		type: "multiple-choice",
		required: "false",
		answer: {
			content: "Option 1",
		},
	};
	const question = new Question(demoQuestion);
	await question.save();
	form.questions.push(question);
	await form.save();
	return res.status(201).send(form._id);
};

//get all form sorted by recent
module.exports.getAllForms = async (req, res, next) => {
	const form = await Form.find({}).sort({ updatedAt: -1 });
	return res.status(200).send(form);
};

//get form and sorted questions
module.exports.getForm = async (req, res, next) => {
	const { id } = req.params;
	const form = await Form.findById(id).populate("questions");
	return res.status(200).send(form);
};

module.exports.deleteForm = async (req, res) => {
	const { id } = req.params;
	await Form.findByIdAndDelete(id);
	return res.status(200).send("form deleted");
};

module.exports.updateForm = async (req, res, next) => {
	const { id } = req.params;
	await Form.findByIdAndUpdate(id, req.body);
	return res.status(200).send("form updated");
};

module.exports.dummyApi = async (req, res) => {
	//console.log(req.body);
	return res.status(200).send("this shall pass");
};

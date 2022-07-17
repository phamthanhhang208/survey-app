const Form = require("../model/form");
const Question = require("../model/question");
const DeleteMedia = require("../model/deleteMedia");
const { startSession } = require("mongoose");

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
	form.author = req.user.email;
	await form.save();
	return res.status(201).send(form._id);
};

//get all form sorted by recent
module.exports.getAllForms = async (req, res, next) => {
	const forms = await Form.find({ author: req.user.email }).sort({
		updatedAt: -1,
	});
	return res.status(200).send(forms);
};

//get form and sorted questions
module.exports.getForm = async (req, res, next) => {
	const { id } = req.params;
	const form = await Form.findById(id).populate("questions");
	return res.status(200).send(form);
};

module.exports.deleteForm = async (req, res, next) => {
	try {
		const session = await startSession();
		session.startTransaction();

		const { id } = req.params;

		//delete form media
		const deleteImgs = [];
		const { questions } = await Form.findById(id, null, { session }).populate(
			"questions"
		);

		for (const question of questions) {
			if (question.questionMedia) {
				deleteImgs.push(question.questionMedia);
			}
			for (let answer of question.answer) {
				if (answer.media) {
					deleteImgs.push(answer.media);
				}
			}
		}
		await DeleteMedia.insertMany(deleteImgs, null, { session });
		await Form.findByIdAndDelete(id).session(session);
		await session.commitTransaction();
		session.endSession();
		return res.status(200).send("form deleted");
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.log(error);
		next(error);
	}
};

module.exports.updateForm = async (req, res, next) => {
	const { id } = req.params;
	await Form.findByIdAndUpdate(id, req.body);
	return res.status(200).send("form updated");
};

module.exports.dummyApi = async (req, res) => {
	console.log(req.user);
	//console.log(req.body);
	return res.status(200).send("this shall pass");
};

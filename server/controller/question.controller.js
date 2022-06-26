const Form = require("../model/form");
const Response = require("../model/response");
const Question = require("../model/question");
const DeleteMedia = require("../model/deleteMedia");
const _ = require("lodash");

// add array of questions
module.exports.addQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const { questions } = req.body;
	let questionsWithFiles = { questions };

	if (req.files) {
		const files = req.files;
		for (const file of files) {
			const { fieldname, path, filename } = file;
			questionsWithFiles = _.set(questionsWithFiles, fieldname, {
				url: path,
				filename,
			});
		}
	}

	const newQuestions = await Question.insertMany(questionsWithFiles.questions);
	// get new question's id
	const questionsId = newQuestions.map((q) => q._id);
	//push to order array
	form.questions.push(...questionsId);
	//save form
	await form.save();

	return res.status(200).send("added questions");
};

// add a question
module.exports.addQuestion = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	let question = req.body;

	if (req.files) {
		const files = req.files;
		for (const file of files) {
			const { fieldname, path, filename } = file;
			question = _.set(question, fieldname, {
				url: path,
				filename,
			});
		}
	}

	question = new Question(question);
	form.questions.push(question);
	await question.save();
	await form.save();

	return res.status(200).send("added question");
};

// update a question

module.exports.editQuestion = async (req, res, next) => {
	const { questionId } = req.params;
	const question = await Question.findById(questionId);
	let editedQuestion = req.body;

	//delete images if needed
	let deleteImg = [];

	if (req.files) {
		const files = req.files;
		for (const file of files) {
			const { fieldname, path, filename } = file;
			editedQuestion = _.set(editedQuestion, fieldname, {
				url: path,
				filename,
			});
		}
	}

	//get old images from answer
	const oldAnswerImages = _.differenceWith(
		question.answer,
		editedQuestion.answer,
		_.isEqual
	)
		.filter(({ media }) => media)
		.map(({ media }) => media);

	deleteImg = [...deleteImg, ...oldAnswerImages];

	//get old question image
	const isQuestionMediaChanged = _.isEqual(
		editedQuestion.questionMedia,
		question.questionMedia
	);
	if (!isQuestionMediaChanged && question.questionMedia !== undefined) {
		deleteImg = [...deleteImg, question.questionMedia];
		await question.updateOne({ $unset: { questionMedia: 1 } });
	}

	//delete from cloudinary

	// if (deleteImg) {
	// 	for (const img of deleteImg) {
	// 		await cloudinary.uploader.destroy(img.filename);
	// 	}
	// }

	// move to deleteImg collection
	await DeleteMedia.insertMany(deleteImg);

	const q = await Question.findByIdAndUpdate(questionId, editedQuestion, {
		new: true,
	});

	return res.status(200).send(q);
};

// delete a question

module.exports.deleteQuestion = async (req, res, next) => {
	const { id, questionId } = req.params;
	await Question.findByIdAndDelete(questionId);
	await Form.findByIdAndUpdate(id, { $pull: { questions: questionId } });
	await Response.updateMany({}, { $pull: { answers: { questionId } } });
	return res.status(200).send("question deleted");
};

// reorder all order array
module.exports.reorderQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const reorderList = req.body;
	form.questions = reorderList;
	await form.save();
	return res.status(200).send("reordered question");
};

// delete a image in question - WIP

module.exports.editQuestionMedia = async (req, res, next) => {
	const img = req.body;
	const deleteItem = img;

	// img = questionMedia || answer.$[].media = {_id,filepath,url}

	await DeleteMedia.create(deleteItem);

	const q = await Question.findByIdAndUpdate(
		req.params.questionId,
		{ $pull: deleteItem },
		{ new: true }
	);

	return res.status(200).send(q);
};

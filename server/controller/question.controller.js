const Form = require("../model/form");
const Response = require("../model/response");
const Question = require("../model/question");
const DeleteMedia = require("../model/deleteMedia");
const _ = require("lodash");
const { startSession } = require("mongoose");
const { cloudinary } = require("../cloudinary");
const { ObjectId } = require("mongodb");

// add array of questions
module.exports.addQuestions = async (req, res, next) => {
	try {
		const session = await startSession();
		session.startTransaction();
		const form = await Form.findById(req.params.id).session(session);
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

		const newQuestions = await Question.insertMany(
			questionsWithFiles.questions,
			{
				new: true,
				session,
			}
		);
		// get new question's id
		const questionsId = newQuestions.map((q) => q._id);
		//push to order array
		form.questions.push(...questionsId);
		//save form
		await form.save({ session });

		await session.commitTransaction();
		session.endSession();
		return res.status(201).send(newQuestions);
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.log(error);
		next(error);
	}
};

// add a question
module.exports.addQuestion = async (req, res, next) => {
	try {
		const session = await startSession();
		session.startTransaction();
		const form = await Form.findById(req.params.id).session(session);
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
		await question.save({ session, new: true });
		await form.save({ session });

		await session.commitTransaction();
		session.endSession();
		return res.status(200).send(question);
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.log(error);
		next(error);
	}
};

// update a question

module.exports.editQuestion = async (req, res, next) => {
	try {
		const { questionId } = req.params;
		const question = await Question.findById(questionId);
		const { _doc: questionContent } = question;
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
			//console.log(editedQuestion);
		}

		//get old images from answer
		const oldAnswerImages = _.differenceWith(
			questionContent.answer,
			editedQuestion.answer,
			_.isEqual
		)
			.filter(({ media }) => media)
			.map(({ media }) => media);

		deleteImg = [...deleteImg, ...oldAnswerImages];

		//get old question image
		const isQuestionMediaChanged = _.isEqual(
			editedQuestion.questionMedia,
			questionContent.questionMedia
		);
		if (
			!isQuestionMediaChanged &&
			questionContent.questionMedia !== undefined
		) {
			deleteImg = [...deleteImg, questionContent.questionMedia];
			await question.updateOne({ $unset: { questionMedia: 1 } });
		}

		// move to deleteImg collection
		await DeleteMedia.insertMany(deleteImg);

		const q = await Question.findByIdAndUpdate(questionId, editedQuestion, {
			new: true,
		});

		return res.status(200).send(q);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

module.exports.deleteQuestion = async (req, res, next) => {
	try {
		const { id, questionId } = req.params;
		const deleteImgs = [];
		const session = await startSession();
		session.startTransaction();
		const question = await Question.findById(questionId, null, { session });
		if (question.questionMedia) {
			deleteImgs.push(question.questionMedia);
		}
		for (let answer of question.answer) {
			if (answer.media) {
				deleteImgs.push(answer.media);
			}
		}
		await Question.findByIdAndDelete(questionId).session(session);
		await Form.findByIdAndUpdate(
			id,
			{ $pull: { questions: questionId } },
			{ session }
		);
		await Response.updateMany(
			{},
			{ $pull: { answers: { questionId } } },
			{ session }
		);
		await DeleteMedia.insertMany(deleteImgs, null, { session });
		await session.commitTransaction();
		session.endSession();
		return res.status(200).send("question deleted");
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.log(error);
		next(error);
	}
};

// reorder all order array
module.exports.reorderQuestions = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	const reorderList = req.body;
	form.questions = reorderList;
	await form.save();
	return res.status(200).send("reordered question");
};

// delete a image in question
module.exports.deleteQuestionMedia = async (req, res, next) => {
	const { questionId } = req.params;
	const img = req.body;
	const { filename, url } = img;

	const question = await Question.findById(questionId);

	const { _doc: questionContent } = question;

	if (_.findKey(questionContent, { filename, url })) {
		await question.updateOne({ $unset: { questionMedia: 1 } }, { new: true });
	} else {
		await question.updateOne(
			{
				"answer.media.url": url,
			},
			{
				$unset: {
					"answer.$.media": "",
				},
			}
		);
	}

	await DeleteMedia.create(img);

	return res.status(200).send("deleted media");
};

// get question by id

module.exports.getQuestion = async (req, res, next) => {
	const { questionId } = req.params;
	const question = await Question.findById(questionId);
	return res.status(200).send(question);
};

// duplicate question

module.exports.duplicateQuestion = async (req, res, next) => {
	const { id, questionId } = req.params;
	const form = await Form.findById(id);
	const question = await Question.findById(questionId);
	let duplicatedQuestion = question._doc;
	delete duplicatedQuestion._id;
	for (let answer of duplicatedQuestion.answer) {
		if (answer.media) {
			const dupFile = await cloudinary.uploader.upload(answer.media.url);
			answer.media = {
				url: dupFile.url,
				filename: `survey-app/${dupFile.public_id}`,
			};
		}
	}
	const q = new Question(duplicatedQuestion);
	await q.save({ new: true });
	const idx = form.questions.indexOf(ObjectId(questionId));
	form.questions.splice(idx + 1, 0, q);
	//form.questions.push(q);
	await form.save({ new: true });
	return res.status(201).send(q);
};

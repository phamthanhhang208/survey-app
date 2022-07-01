const express = require("express");
const router = express.Router({ mergeParams: true });
const question = require("../controller/question.controller");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const {
	validationQuestionList,
	validateQuestionInput,
} = require("../middleware/validateInput");

const {
	validateFormId,
	validateQuesionId,
} = require("../middleware/validateId");

const {
	validateQuestionMedia,
	validateAllQuestionMedias,
} = require("../middleware/validateMedia");

const catchAsync = require("../helper/catchAsync");

router.post(
	"/many",
	validateFormId,
	upload.any(),
	validationQuestionList,
	catchAsync(question.addQuestions)
);

router.post(
	"/",
	validateFormId,
	upload.any(),
	validateQuestionInput,
	question.addQuestion
);
router.delete(
	"/:questionId",
	validateFormId,
	validateQuesionId,
	catchAsync(question.deleteQuestion)
);

router.get(
	"/:questionId",
	validateFormId,
	validateQuesionId,
	catchAsync(question.getQuestion)
);

router.put(
	"/:questionId",
	validateFormId,
	upload.any(),
	validateQuesionId,
	validateQuestionInput,
	validateAllQuestionMedias,
	catchAsync(question.editQuestion)
);

router.delete(
	"/:questionId/media",
	validateQuestionMedia,
	catchAsync(question.deleteQuestionMedia)
);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

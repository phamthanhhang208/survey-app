const express = require("express");
const router = express.Router({ mergeParams: true });
const response = require("../controller/response.controller");

const { validationResponseInput } = require("../middleware/validateInput");

const {
	validateFormId,
	validateResponseId,
	validateResponseQuestionId,
} = require("../middleware/validateId");

const {
	isAnswerExist,
	validateAnswer,
} = require("../middleware/validateAnswers");

const { checkAuth, checkRole } = require("../auth");

const { isAuthor } = require("../middleware/validateAuthorize");

const { isFormAcceptResponse } = require("../middleware/validateFormSetting");

const catchAsync = require("../helper/catchAsync");

router.post(
	"/",
	checkAuth,
	checkRole(["teacher", "student"]),
	validateFormId,
	validationResponseInput,
	validateResponseQuestionId,
	isFormAcceptResponse,
	catchAsync(isAnswerExist),
	validateAnswer,
	catchAsync(response.addResponseToForm)
);

//for testing
// router.post(
// 	"/test",
// 	validationResponseInput,
// 	validateFormId,
// 	validateResponseQuestionId,
// 	isAnswerExist,
// 	validateAnswer,
// 	form.dummyApi
// );

router.get(
	"/",
	checkAuth,
	checkRole(),
	validateFormId,
	isAuthor,
	catchAsync(response.getResponses)
);
router.get(
	"/:responseId",
	checkAuth,
	checkRole(),
	validateFormId,
	isAuthor,
	validateResponseId,
	catchAsync(response.getResponse)
);
router.delete(
	"/:responseId",
	checkAuth,
	checkRole(),
	validateFormId,
	isAuthor,
	validateResponseId,
	catchAsync(response.deleteResponse)
);

router.delete(
	"/",
	checkAuth,
	checkRole(),
	validateFormId,
	isAuthor,
	catchAsync(response.deleteAllResponses)
);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

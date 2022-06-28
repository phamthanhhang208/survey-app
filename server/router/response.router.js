const express = require("express");
const router = express.Router({ mergeParams: true });
const response = require("../controller/response.controller");
const form = require("../controller/form.controller");

const { validationResponseInput } = require("../middleware/validateInput");

const {
	validateFormId,
	validateResponseQuestionId,
} = require("../middleware/validateId");

const {
	isAnswerExist,
	validateAnswer,
} = require("../middleware/validateAnswers");

const { isFormAcceptResponse } = require("../middleware/validateFormSetting");

router.post(
	"/",
	validationResponseInput,
	validateResponseQuestionId,
	isFormAcceptResponse,
	isAnswerExist,
	validateAnswer,
	response.addResponseToForm
);

//for testing
router.post(
	"/test",
	validationResponseInput,
	validateResponseQuestionId,
	isAnswerExist,
	validateAnswer,
	form.dummyApi
);

router.get("/", validateFormId, response.getResponses);
router.get("/:responseId", validateFormId, response.getResponse);
router.delete("/:responseId", validateFormId, response.deleteResponse);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

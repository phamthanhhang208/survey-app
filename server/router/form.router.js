const express = require("express");
const router = express.Router();
const form = require("../controller/form.controller");
const question = require("../controller/question.controller");
const response = require("../controller/response.controller");
const {
	validateFormInput,
	validationResponseInput,
} = require("../middleware/validateInput");

const {
	validateFormId,
	validateAllQuestionIds,
	validateResponseQuestionId,
} = require("../middleware/validateId");

const {
	isAnswerExist,
	validateAnswer,
} = require("../middleware/validateAnswers");

router.post("/", validateFormInput, form.createForm);
router.get("/", form.getAllForms);
router.get("/:id", validateFormId, form.getForm);
router.delete("/:id", validateFormId, form.deleteForm);
router.put("/:id", validateFormId, validateFormInput, form.updateForm);

router.post(
	"/:id/responses",
	validationResponseInput,
	validateResponseQuestionId,
	response.addResponseToForm
);

router.post(
	"/:id/responses/test",
	validationResponseInput,
	validateResponseQuestionId,
	isAnswerExist,
	validateAnswer,
	form.dummyApi
);

router.get("/:id/responses", validateFormId, response.getResponses);
router.get("/:id/responses/:responseId", validateFormId, response.getResponse);
router.delete(
	"/:id/responses/:responseId",
	validateFormId,
	response.deleteResponse
);

router.patch(
	"/:id",
	validateFormId,
	validateAllQuestionIds,
	question.reorderQuestions
);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const form = require("../controller/form.controller");
const question = require("../controller/question.controller");
const response = require("../controller/response.controller");
const {
	validateQuiz,
	validateFormInput,
} = require("../middleware/validateInput");

router.post("/new", validateFormInput, form.createForm);
router.get("/", form.getAllForms);
router.get("/:id", form.getForm);
router.delete("/:id", form.deleteForm);
router.put("/:id", validateFormInput, form.updateForm);
router.post("/:id/responses", response.addResponseToForm);
router.post("/:id/questions", validateQuiz, question.addQuestions);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

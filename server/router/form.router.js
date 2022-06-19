const express = require("express");
const router = express.Router();
const form = require("../controller/form.controller");
const question = require("../controller/question.controller");
const analytic = require("../controller/analytic.controller");
const exportFile = require("../controller/export.controller");
const { validateFormInput } = require("../middleware/validateInput");

const {
	validateFormId,
	validateAllQuestionIds,
} = require("../middleware/validateId");

router.post("/", validateFormInput, form.createForm);
router.get("/", form.getAllForms);
router.get("/:id", validateFormId, form.getForm);
router.delete("/:id", validateFormId, form.deleteForm);
router.put("/:id", validateFormId, validateFormInput, form.updateForm);

router.patch(
	"/:id",
	validateFormId,
	validateAllQuestionIds,
	question.reorderQuestions
);

router.get("/:id/analytic", analytic.getAnalytics);

router.get("/:id/download", exportFile.exportsToExcel);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

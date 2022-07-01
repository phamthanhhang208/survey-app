const express = require("express");
const router = express.Router();
const form = require("../controller/form.controller");
const question = require("../controller/question.controller");
const analytic = require("../controller/analytic.controller");
const exportFile = require("../controller/export.controller");
const { validateFormInput } = require("../middleware/validateInput");
const catchAsync = require("../helper/catchAsync");

const {
	validateFormId,
	validateAllQuestionIds,
} = require("../middleware/validateId");

router.post("/", validateFormInput, catchAsync(form.createForm));
router.get("/", catchAsync(form.getAllForms));
router.get("/:id", validateFormId, catchAsync(form.getForm));
router.delete("/:id", validateFormId, catchAsync(form.deleteForm));
router.put(
	"/:id",
	validateFormId,
	validateFormInput,
	catchAsync(form.updateForm)
);

router.patch(
	"/:id",
	validateFormId,
	validateAllQuestionIds,
	catchAsync(question.reorderQuestions)
);

router.get("/:id/analytic", catchAsync(analytic.getAnalytics));

router.get("/:id/download", catchAsync(exportFile.exportsToExcel));

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

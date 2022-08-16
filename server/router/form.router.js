const express = require("express");
const router = express.Router();
const form = require("../controller/form.controller");
const question = require("../controller/question.controller");
const analytic = require("../controller/analytic.controller");
const exportFile = require("../controller/export.controller");
const { validateFormInput } = require("../middleware/validateInput");
const catchAsync = require("../helper/catchAsync");

//const { checkAuth, checkRole } = require("../auth");
//const { isAuthor } = require("../middleware/validateAuthorize");
//const {roles} = require("../constant/role")

const {
	validateFormId,
	validateAllQuestionIds,
} = require("../middleware/validateId");

router.post(
	"/",
	// checkAuth,
	// checkRole(),
	validateFormInput,
	catchAsync(form.createForm)
);
router.get(
	"/",
	// checkAuth,
	// checkRole(),
	catchAsync(form.getAllForms)
);
router.get(
	"/:id",
	// checkAuth,
	// checkRole([roles.teacher, roles.student]),
	validateFormId,
	catchAsync(form.getForm)
);
router.delete(
	"/:id",
	// checkAuth,
	// checkRole(),
	validateFormId,
	//isAuthor,
	catchAsync(form.deleteForm)
);
router.put(
	"/:id",
	validateFormId,
	validateFormInput,
	catchAsync(form.updateForm)
);

router.patch(
	"/:id",
	// checkAuth,
	// checkRole(),
	validateFormId,
	//isAuthor,
	validateAllQuestionIds,
	catchAsync(question.reorderQuestions)
);

router.get(
	"/:id/analytic",
	// checkAuth,
	// checkRole(),
	// isAuthor,
	catchAsync(analytic.getAnalytics)
);

router.get(
	"/:id/download",
	// checkAuth,
	// checkRole(),
	// isAuthor,
	catchAsync(exportFile.exportsToExcel)
);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const form = require("../controller/form.controller");

router.post("/new", form.createForm);
router.get("/", form.getAllForms);
router.delete("/:id", form.deleteForm);
router.post("/:id/responses", form.addResponseToForm);

router.use((err, req, res, next) => {
	console.log(err);
	const { statusCode = 500, message = "Oops,something went wrong" } = err;
	return res.status(statusCode).send(message);
});

module.exports = router;

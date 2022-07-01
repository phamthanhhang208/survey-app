const Form = require("../model/form");
const AppError = require("../helper/AppError");

exports.isFormAcceptResponse = async (req, res, next) => {
	const { id } = req.params;
	const form = await Form.findById(id);
	if (!form.isAcceptResponse)
		return next(
			new AppError(400, "This form is no longer accepting responses")
		);
	return next();
};

// check if form collect user email

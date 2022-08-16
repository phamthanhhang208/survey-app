const Form = require("../model/form");
const AppError = require("../helper/AppError");

// check if author id match
module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const { email } = req.user;
	const form = await Form.findById(id);
	const { author } = form;
	if (author !== email) return next(new AppError(401));
	return next();
};

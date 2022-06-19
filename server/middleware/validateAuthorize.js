const Form = require("../model/form");

exports.isFormAcceptResponse = async (req, res, next) => {
	const { id } = req.params;
	const form = await Form.findById(id);
	if (!form.isAcceptResponse)
		return new Error("This form is no longer accepting responses");
	return next();
};

const Form = require("../model/form");

module.exports.createForm = async (req, res, next) => {
	const form = new Form(req.body.form);
	await form.save();
	console.log(form);
	return res.status(200).send("form saved");
};

module.exports.getAllForms = async (req, res, next) => {
	const form = await Form.find({});
	return res.status(200).send(form);
};

module.exports.getForm = async (req, res, next) => {
	const form = await Form.findById(req.params.id);
	return res.status(200).send(form);
};

module.exports.deleteForm = async (req, res) => {
	const { id } = req.params;
	await Form.findByIdAndDelete(id);
	return res.status(200).send("form deleted");
};

module.exports.updateForm = async (req, res) => {
	const { id } = req.params;
	await Form.findByIdAndUpdate(id, req.body);
	return res.status(200).send("form updated");
};

module.exports.dummyApi = async (req, res) => {
	console.log(req.body);
	return res.status(200).send("this shall pass");
};

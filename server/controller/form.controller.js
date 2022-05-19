const form = require("../model/form");
const Form = require("../model/form");
const Response = require("../model/response");

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

module.exports.deleteForm = async (req, res) => {
	const { id } = req.params;
	await Form.findByIdAndDelete(id);
	return res.status(200).send("form deleted");
};

module.exports.addResponseToForm = async (req, res) => {
	const form = await Form.findById(req.params.id);
	const response = new Response(req.body.response);
	form.responses.push(response);
	await response.save();
	await form.save();
	return res.status(200).send("added response");
};

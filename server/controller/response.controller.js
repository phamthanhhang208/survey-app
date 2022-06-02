const Form = require("../model/form");
const Response = require("../model/response");

module.exports.addResponseToForm = async (req, res) => {
	const form = await Form.findById(req.params.id);
	const response = new Response(req.body.response);
	form.responses.push(response);
	await response.save();
	await form.save();
	return res.status(200).send("added response");
};

module.exports.getResponses = async (req, res) => {
	const form = await Form.findById(req.params.id).populate("responses");
	const { responses } = form;
	return res.status(200).send(responses);
};

module.exports.getResponse = async (req, res) => {
	const response = await Response.findById(req.params.responseId);
	return res.status(200).send(response);
};

module.exports.deleteResponse = async (req, res) => {
	const { id, responseId } = req.params;
	await Response.findByIdAndDelete(responseId);
	await Form.findByIdAndUpdate(id, { $pull: { responses: responseId } });
	return res.status(200).send("deleted response");
};

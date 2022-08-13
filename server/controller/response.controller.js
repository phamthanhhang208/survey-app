const Form = require("../model/form");
const Response = require("../model/response");

module.exports.addResponseToForm = async (req, res) => {
	const form = await Form.findById(req.params.id);
	const response = new Response(req.body);
	form.responses.push(response);
	if (!form.isAllowAnonymous) {
		response.user = req.user.email;
	}
	await response.save();
	await form.save();
	return res.status(201).send("added response");
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

module.exports.deleteAllResponses = async (req, res) => {
	const { id } = req.params;
	const form = await Form.findById(id);
	const { responses } = form;
	await Response.deleteMany({
		_id: {
			$in: responses,
		},
	});
	await form.updateOne({ $pull: { responses: { $in: responses } } });
	return res.status(200).send("deleted all");
};

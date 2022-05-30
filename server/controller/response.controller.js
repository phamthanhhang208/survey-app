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

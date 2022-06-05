const Form = require("../model/form");

module.exports.createForm = async (req, res, next) => {
	const form = new Form(req.body.form);
	await form.save();
	//get all question id
	if (form.questions.length !== 0) {
		const questionsId = form.questions.map((q) => q._id);
		//push to order array
		form.order.push(...questionsId);
		//save form
		await form.save();
	}
	return res.status(200).send("form saved");
};

//get all form sorted by recent
module.exports.getAllForms = async (req, res, next) => {
	const form = await Form.find({}).sort({ updatedAt: -1 });
	return res.status(200).send(form);
};

//get form and sorted questions
module.exports.getForm = async (req, res, next) => {
	const { id } = req.params;
	const form = await Form.findById(id);
	const { order, questions } = form;

	//reorder question based on order
	const reordered = questions.slice().sort(function (a, b) {
		return order.indexOf(a._id) - order.indexOf(b._id);
	});

	const reorderedForm = { ...form._doc, questions: reordered };

	return res.status(200).send(reorderedForm);
};

module.exports.deleteForm = async (req, res) => {
	const { id } = req.params;
	await Form.findByIdAndDelete(id);
	return res.status(200).send("form deleted");
};

module.exports.updateForm = async (req, res, next) => {
	const { id } = req.params;
	const { questions, order } = req.body.form;
	if (questions || order) return next(new Error("invalid input"));
	await Form.findByIdAndUpdate(id, req.body.form);
	return res.status(200).send("form updated");
};

module.exports.dummyApi = async (req, res) => {
	//console.log(req.body);
	return res.status(200).send("this shall pass");
};

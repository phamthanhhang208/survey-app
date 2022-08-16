const Form = require("../model/form");
const Response = require("../model/response");
const Question = require("../model/question");
const dayjs = require("dayjs");
const { exportExcel } = require("../helper/utils");

module.exports.exportsToExcel = async (req, res, next) => {
	let header = [""];
	let rows = [];
	const { id } = req.params;
	const form = await Form.findById(id)
		.populate("questions")
		.populate("responses");
	const { questions, responses } = form;
	const { title } = form;
	const fileName = title.replace(/\s/g, "-");
	const questionIds = questions.map((q) => q._id);
	if (!form.isAllowAnonymous) {
		header.push("Email");
	}

	for (let question of questions) {
		header.push(question.questionText);
	}
	for (let response of responses) {
		let row = [];
		row.push(dayjs.unix(response.createdAt).format("DD-MM-YYYY hh:mm:ss"));

		if (header.includes("Email")) {
			if (response.user) {
				row.push(response.user);
			} else {
				row.push("");
			}
		}
		const reorderedResponse = questionIds.map((id) =>
			response.answers.find(({ questionId }) => questionId === id.toString())
		);
		let answerRow = reorderedResponse.map((r) => {
			if (r?.answer) {
				return r.answer.map((a) => a.content).toString();
			}
			return "";
		});
		row.push(...answerRow);
		rows.push(row);
	}

	//const file = exportExcel({ fileName, header, rows });
	return res.status(200).send({ fileName, header, rows });
};

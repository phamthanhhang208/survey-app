const XLSX = require("xlsx");
exports.isContain = (questionAnswers, actualAnswer) => {
	let result;
	for (let a of actualAnswer) {
		result = questionAnswers.some((el) => el.content == a.content);
		if (!result) return false;
	}
	return true;
};

exports.exportExcel = ({ fileName, header, rows }) => {
	const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
	const max_width = rows.reduce((w, r) => Math.max(w, r.length), 10);
	worksheet["!cols"] = [{ wch: max_width }];

	XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

exports.attachMediaToQuestion = ({ files, question }) => {
	const { answer } = question;
	const questionImg = files.find((f) => f.fieldname === "questionMedia");
	question.questionMedia = questionImg
		? {
				url: questionImg.path,
				filename: questionImg.filename,
		  }
		: null;
	for (let i = 0; i < answer.length; i++) {
		const answerImg = files.find((f) => f.fieldname === `answer[${i}][media]`);
		answer[i]["media"] = answerImg
			? {
					url: answerImg.path,
					filename: answerImg.filename,
			  }
			: null;
	}

	return;
};

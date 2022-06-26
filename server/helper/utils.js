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

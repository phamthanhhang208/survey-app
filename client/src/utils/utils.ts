import * as XLSX from "xlsx";

export const removeUndefinedValue = (obj: any) => {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === undefined) {
			delete obj[key];
		}
	});
	return obj;
};

export const exportExcel = ({
	fileName,
	header,
	rows,
}: {
	fileName: any;
	header: any;
	rows: any;
}) => {
	const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
	const max_width = rows.reduce((w: any, r: any) => Math.max(w, r.length), 10);
	worksheet["!cols"] = [{ wch: max_width }];
	XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

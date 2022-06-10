export const removeUndefinedValue = (obj: any) => {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === undefined) {
			delete obj[key];
		}
	});
	return obj;
};

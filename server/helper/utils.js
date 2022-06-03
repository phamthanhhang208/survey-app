exports.isContain = (questionAnswers, actualAnswer) => {
	let result;
	for (let a of actualAnswer) {
		result = questionAnswers.some((el) => el.content == a.content);
		if (!result) return false;
	}
	return true;
};

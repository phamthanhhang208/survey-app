exports.validateAnswerSchema = (validator, answer) => {
	//let isValid
	const { type, length } = validator;
	switch (type) {
		default:
			return true;
		case "maxChoices":
			return answer.length <= length;
		case "minChoices":
			return answer.length >= length;
		case "exactChoices":
			return answer.length === length;
		case "minLength":
			return answer.length === 1 && answer[0].content.length >= length;
		case "maxLength":
			return answer.length === 1 && answer[0].content.length <= length;
		case "isNumber":
			if (answer.length !== 1) return false;
			return !isNaN(Number(answer[0].content));
		case "isCharacter":
			if (answer.length !== 1) return false;
			break;
	}
	//return isValid;
};

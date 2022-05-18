const checkBoxQuestion = {
	validator: {
		type: { enum: ["maxChoices", "minChoices"] },
	},
	answers: {
		type: "array",
		items: {
			type: "object",
			properties: {
				choiceText: "string",
			},
		},
	},
};

const optionQuestion = {
	answers: {
		type: "array",
		items: {
			type: "object",
			properties: {
				optionText: "string",
			},
		},
	},
};

const shortParagraphQuestion = {
	validator: {
		type: { enum: ["isNumber", "isCharacter", "isBetween"] },
	},
	answers: "string",
};

const paragraphQuestion = {
	validator: {
		type: { enum: ["minLength", "maxLength"] },
	},
	answers: "string",
};

module.exports = {
	checkBoxQuestion,
	optionQuestion,
	shortParagraphQuestion,
	paragraphQuestion,
};

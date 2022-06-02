const schemaAnswer = {
	type: "object",
	properties: {
		content: {
			type: "string",
		},
	},
};

const schemaResponse = {
	type: "object",
	additionalProperties: false,
	properties: {
		questionId: {
			type: "string",
		},
		answers: {
			type: "array",
			items: schemaAnswer,
		},
	},
};

module.exports = {
	schemaResponse,
};

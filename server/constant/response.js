const schemaAnswer = {
	type: "object",
	additionalProperties: false,
	properties: {
		questionId: {
			type: "string",
		},
		answer: {
			type: "array",
			items: {
				type: "object",
				properties: {
					content: {
						type: "string",
					},
				},
			},
		},
	},
	required: ["questionId", "answer"],
};

const schemaResponse = {
	type: "object",
	additionalProperties: false,
	properties: {
		answers: {
			type: "array",
			uniqueItemProperties: ["questionId"],
			items: schemaAnswer,
		},
	},
	required: ["answers"],
};

module.exports = {
	schemaResponse,
};

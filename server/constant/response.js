const schemaAnswer = {
	type: "object",
	additionalProperties: false,
	properties: {
		questionId: {
			type: "string",
		},
		answer: {
			type: "array",
			minItems: 1,
			items: {
				type: "object",
				required: ["content"],
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

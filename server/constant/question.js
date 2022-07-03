const CHECKBOXES = "checkboxes";
const MULTIPLECHOICE = "multiple-choice";
const SHORT = "short-paragraph";
const PARAGRAPH = "paragraph";

// const checkBoxesValidationRules = ["maxChoices", "minChoices", "exactChoices"];
// const shortParagraphValidationRules = ["isNumber", "isCharacter", "maxLength"];
// const paragraphQuestionValidationRules = ["minLength", "maxLength"];

const validator = {
	max: {
		type: "number",
	},
	min: {
		type: "number",
	},
	message: {
		type: "string",
	},
};

const checkBoxesValidationRules = {
	type: {
		enum: ["array"],
	},
	...validator,
};

const shortParagraphValidationRules = {
	type: {
		enum: ["string", "number"],
	},
	pattern: {
		type: "string",
	},
	...validator,
};

const paragraphQuestionValidationRules = {
	type: {
		enum: ["string"],
	},
	...validator,
};

const schemaQuestion = {
	type: "object",
	additionalProperties: false,
	properties: {
		questionText: {
			type: "string",
		},
		questionMedia: {
			type: "object",
			required: ["url", "filename"],
			properties: {
				url: {
					type: "string",
				},
				filename: {
					type: "string",
				},
			},
		},
		type: {
			enum: [CHECKBOXES, MULTIPLECHOICE, SHORT, PARAGRAPH],
		},
		required: {
			type: "boolean",
		},
		description: {
			type: "string",
		},
		answer: {
			type: "array",
			uniqueItemProperties: ["content"],
			items: {
				type: "object",
				required: ["content"],
				properties: {
					content: {
						type: "string",
					},
					media: {
						type: "object",
						properties: {
							url: {
								type: "string",
							},
							filename: {
								type: "string",
							},
						},
						additionalProperties: false,
						required: ["url", "filename"],
					},
				},
				additionalProperties: false,
			},
		},

		validator: {
			type: "object",
			required: ["type"],
			properties: {
				type: {},
				max: {
					type: "number",
				},
				min: {
					type: "number",
				},
				message: {
					type: "string",
				},
				// type: {},
				// length: {
				// 	type: "number",
				// },
				// message: {
				// 	type: "string",
				// },
			},
		},
	},

	allOf: [
		{
			if: {
				properties: {
					type: { const: CHECKBOXES },
				},
			},
			then: {
				properties: {
					validator: {
						type: "object",
						properties: {
							type: {
								enum: ["array"],
							},
							//type: { enum: checkBoxesValidationRules },
							//...checkBoxesValidationRules,
						},
						anyOf: [
							{
								required: ["max"],
							},
							{
								required: ["min"],
							},
						],
					},
				},
			},
		},
		{
			if: {
				properties: {
					type: { const: SHORT },
				},
			},
			then: {
				properties: {
					validator: {
						type: "object",
						properties: {
							//type: { enum: shortParagraphValidationRules },
							//...shortParagraphValidationRules,
							type: {
								enum: ["string", "number"],
							},
							pattern: {
								type: "string",
							},
						},
					},
				},
			},
		},
		{
			if: {
				properties: {
					type: { const: PARAGRAPH },
				},
			},
			then: {
				properties: {
					validator: {
						type: "object",
						properties: {
							//type: { enum: paragraphQuestionValidationRules },
							//...paragraphQuestionValidationRules,
							type: {
								enum: ["string"],
							},
						},
					},
				},
			},
		},
		{
			if: {
				properties: {
					type: { const: MULTIPLECHOICE },
				},
			},
			then: {
				properties: {
					validator: false,
				},
			},
		},
	],
	required: ["questionText", "type", "required", "answer"],
};

module.exports = {
	//question's type
	CHECKBOXES,
	MULTIPLECHOICE,
	SHORT,
	PARAGRAPH,
	// question validation rule
	checkBoxesValidationRules,
	shortParagraphValidationRules,
	paragraphQuestionValidationRules,
	//question json schema
	schemaQuestion,
};

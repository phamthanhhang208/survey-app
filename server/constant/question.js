const CHECKBOXES = "checkboxes";
const MULTIPLECHOICE = "multiple-choice";
const SHORT = "short-paragraph";
const PARAGRAPH = "paragrapgh";

const checkBoxesValidationRules = ["maxChoices", "minChoices", "exactChoices"];
const shortParagraphValidationRules = ["isNumber", "isCharacter", "maxLength"];
const paragraphQuestionValidationRules = ["minLength", "maxLength"];

const schemaQuestion = {
	type: "object",
	additionalProperties: false,
	properties: {
		questionText: {
			type: "string",
		},
		questionMedia: {
			type: "object",
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
			//type: "boolean",
			enum: ["true", "false"],
		},
		description: {
			type: "string",
		},
		answer: {
			type: "array",
			uniqueItemProperties: ["content"],
			items: {
				type: "object",
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
					},
				},
				additionalProperties: false,
				required: ["content"],
			},
		},

		validator: {
			type: "object",
			properties: {
				type: {},
				length: {
					type: "number",
				},
				message: {
					type: "string",
				},
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
							type: { enum: checkBoxesValidationRules },
						},
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
							type: { enum: shortParagraphValidationRules },
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
							type: { enum: paragraphQuestionValidationRules },
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

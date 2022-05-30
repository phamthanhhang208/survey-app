const {
	CHECKBOXES,
	MULTIPLECHOICE,
	SHORT,
	PARAGRAPH,
} = require("../constant/questionType");

const {
	checkBoxesValidationRules,
	shortParagraphValidationRules,
	paragraphQuestionValidationRules,
} = require("../constant/questionValidationRules");

const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-keywords")(ajv, ["uniqueItemProperties"]);

const schemaQuestion = {
	type: "object",
	properties: {
		questionText: {
			type: "string",
		},
		type: {
			enum: [CHECKBOXES, MULTIPLECHOICE, SHORT, PARAGRAPH],
		},
		requried: {
			type: "boolean",
		},
		description: {
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
};

const validateQuestion = ajv.compile(schemaQuestion);

exports.validateQuestion = validateQuestion;

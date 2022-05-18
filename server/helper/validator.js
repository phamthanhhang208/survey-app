function validator() {
	const Ajv = require("ajv");
	const ajv = new Ajv();
	require("ajv-keywords")(ajv, ["uniqueItemProperties"]);

	const schemaQuestion = {
		type: "object",
		properties: {
			questionText: "string",
			type: {
				enum: ["multiple-choice", "option", "short-paragraph", "paragraph"],
			},
			requried: "boolean",
			description: "string",
		},
	};
}

exports.validator = validator;

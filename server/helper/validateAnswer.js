const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({ useDefaults: true, coerceTypes: true });
addFormats(ajv);
require("ajv-keywords")(ajv, ["uniqueItemProperties"]);
const _ = require("lodash");

exports.validatorAnswer = (answer, { type, max, min, pattern }) => {
	switch (type) {
		default:
			return "Validator type does not support yet";
		case "array":
			return this.validateArrayAnswer(answer, { max, min });
		case "string":
			return this.validateString(answer, { max, min, pattern });
		case "number":
			return this.validateNumber(answer, { max, min });
	}
};

exports.validateArrayAnswer = (answerArray, { max, min }) => {
	const schema = {
		type: "array",
		...(min && { minItems: min }),
		...(max && { maxItems: max }),
	};
	return validateAnswerSchema(answerArray, schema);
};

exports.validateString = (answer, { max, min, pattern }) => {
	const schema = {
		type: "string",
		...(max && { maxLength: max }),
		...(min && { minLength: min }),
		...(pattern && { pattern: pattern }),
	};
	return validateAnswerSchema(answer, schema);
};

exports.validateNumber = (answer, { max, min }) => {
	const schema = {
		type: "number",
		...(max && { maximum: max }),
		...(min && { minimum: min }),
	};
	return validateAnswerSchema(_.toNumber(answer), schema);
};

const validateAnswerSchema = (answer, schema) => {
	const validate = ajv.compile(schema);
	const isValid = validate(answer);
	if (!isValid) {
		console.log(validate.errors);
		return;
	}
	return true;
};

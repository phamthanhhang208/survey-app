const { schemaQuestion } = require("../constant/question");
const { schemaForm } = require("../constant/form");
const { schemaResponse } = require("../constant/response");

const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ useDefaults: true, coerceTypes: true });
addFormats(ajv);
require("ajv-keywords")(ajv, ["uniqueItemProperties"]);

const schemaQuestions = {
	type: "array",
	items: schemaQuestion,
};

const validateQuestions = ajv.compile(schemaQuestions);
const validateQuestion = ajv.compile(schemaQuestion);
const validateForm = ajv.compile(schemaForm);
const validateResponse = ajv.compile(schemaResponse);

exports.validateQuestions = validateQuestions;
exports.validateQuestion = validateQuestion;
exports.validateForm = validateForm;
exports.validateResponse = validateResponse;

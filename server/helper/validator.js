const { schemaQuestion } = require("../constant/question");
const { schemaForm } = require("../constant/form");

const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ useDefaults: true });
addFormats(ajv);
require("ajv-keywords")(ajv, ["uniqueItemProperties"]);

const schemaQuestions = {
	type: "array",
	items: schemaQuestion,
};

const validateQuestions = ajv.compile(schemaQuestions);
const validateQuestion = ajv.compile(schemaQuestion);
const validateForm = ajv.compile(schemaForm);

exports.validateQuestions = validateQuestions;
exports.validateQuestion = validateQuestion;
exports.validateForm = validateForm;

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

const validateQuestion = ajv.compile(schemaQuestions);
const validateForm = ajv.compile(schemaForm);

exports.validateQuestion = validateQuestion;
exports.validateForm = validateForm;

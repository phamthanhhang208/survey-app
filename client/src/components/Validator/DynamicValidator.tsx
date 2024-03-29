import {
	MULTIPLECHOICE,
	questionOperators,
	questionValidation,
} from "@/const/question";
import { Form, FormInstance, Input, Select } from "antd";
import { useEffect, useState } from "react";
import DynamicValidatorInput from "./DynamicValidatorInput";
import "./DynamicValidator.scss";

const { Option } = Select;

interface DynamicValidatorProps {
	questionType:
		| keyof typeof questionValidation
		| keyof typeof questionOperators;
	form: FormInstance;
}

const DynamicValidator = ({ questionType, form }: DynamicValidatorProps) => {
	const [operations, setOperations] = useState<any>([]);

	useEffect(() => {
		// if there add new question validation then set default value like this everytime question type change
		if (questionType === MULTIPLECHOICE || !questionType) {
			return;
		}

		form.setFieldsValue({
			validator: { type: questionValidation[questionType][0]?.value },
		});

		if (!form.getFieldValue(["validator", "operations"])) {
			form.setFieldsValue({ validator: { operations: null } });
		}

		const value = form.getFieldValue(["validator", "type"]);

		setOperations(questionOperators[questionType][value]);

		if (!form.getFieldValue(["validator", "operations"])) {
			form.setFieldsValue({
				validator: {
					operations: questionOperators[questionType][value][0].type,
				},
			});
		}
	}, [questionType, form]);

	const handleChange = (value: any) => {
		setOperations(questionOperators[questionType][value]);
		form.setFieldsValue({
			validator: { operations: questionOperators[questionType][value][0].type },
		});
	};

	return questionType === MULTIPLECHOICE ? null : (
		<Form.Item className="dynamic-validator" wrapperCol={{ span: 24 }}>
			<Input.Group style={{ whiteSpace: "nowrap", display: "flex", gap: 10 }}>
				<Form.Item
					name={["validator", "type"]}
					style={
						questionValidation[questionType]?.length > 1
							? { display: "flex" }
							: { display: "none" }
					}
				>
					<Select onChange={handleChange}>
						{questionValidation[questionType]?.map((type: any) => {
							return (
								<Option key={type.value} value={type.value}>
									{type.display}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				{operations ? (
					<>
						<Form.Item
							name={["validator", "operations"]}
							shouldUpdate={(prevValues, curValues) =>
								prevValues.validator?.type !== curValues.validator?.type
							}
						>
							<Select>
								{operations.map((s: any) => {
									return (
										<Option key={s?.type} value={s.type}>
											{s.display}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							shouldUpdate={(prevValues, curValues) =>
								prevValues.validator?.operations !==
								curValues.validator?.operations
							}
						>
							{({ getFieldValue }) => {
								const name = getFieldValue(["validator", "operations"]);
								if (name) {
									return <DynamicValidatorInput operator={name} />;
								}
							}}
						</Form.Item>
					</>
				) : null}

				<Form.Item name={["validator", "message"]} style={{ width: "100%" }}>
					<Input
						placeholder="Enter custom message ..."
						allowClear
						style={{ width: "100%" }}
					/>
				</Form.Item>
			</Input.Group>
		</Form.Item>
	);
};

export default DynamicValidator;

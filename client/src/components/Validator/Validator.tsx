import { Form, Input, Select, InputNumber } from "antd";
import { questionValidation } from "@/const/question";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isNumber, isCharacter } from "@/const/question";

const { Option } = Select;

const Validator = (props: any) => {
	const { type, resetField } = props;
	return;

	// return questionValidation[type].length !== 0 ? (
	// 	<Form.Item
	// 		label="Response validation"
	// 		name="validator"
	// 		style={{ width: "100%" }}
	// 		noStyle
	// 	>
	// 		<Input.Group style={{ width: "100%", whiteSpace: "nowrap" }} compact>
	// 			<Form.Item
	// 				name={["validator", "type"]}
	// 				style={{ width: "35%" }}
	// 				rules={[
	// 					({ getFieldValue }) => ({
	// 						validator(_, value) {
	// 							const validator = getFieldValue("validator");
	// 							if (validator?.length && !value)
	// 								return Promise.reject(
	// 									new Error("Please choose the validation type first!")
	// 								);
	// 						},
	// 					}),
	// 				]}
	// 			>
	// 				<Select>
	// 					{questionValidation[type].map((q: any) => {
	// 						return (
	// 							<Option value={q.value} key={q.value}>
	// 								{q.display}
	// 							</Option>
	// 						);
	// 					})}
	// 				</Select>
	// 			</Form.Item>
	// 			<Form.Item
	// 				noStyle
	// 				shouldUpdate={(prevValue, currentValue) =>
	// 					prevValue.validator?.type !== currentValue.validator?.type
	// 				}
	// 			>
	// 				{({ getFieldValue }) => {
	// 					const validator = getFieldValue("validator");
	// 					const required = validator?.type !== null;
	// 					return validator?.type === isNumber ||
	// 						validator?.type === isCharacter ? null : (
	// 						<Form.Item name={["validator", "length"]}>
	// 							<InputNumber min={0} placeholder="Number" required={required} />
	// 						</Form.Item>
	// 					);
	// 				}}
	// 			</Form.Item>
	// 			<Form.Item name={["validator", "message"]} style={{ width: "45%" }}>
	// 				<Input placeholder="Enter custom message ..." allowClear />
	// 			</Form.Item>
	// 			<Form.Item>
	// 				<MinusCircleOutlined
	// 					className="dynamic-delete-button"
	// 					style={{ top: 0 }}
	// 					onClick={() => resetField("validator")}
	// 				/>
	// 			</Form.Item>
	// 		</Input.Group>
	// 	</Form.Item>
	// ) : null;
};

export default Validator;

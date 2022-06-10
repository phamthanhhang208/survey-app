import { Form, Input, Select, InputNumber } from "antd";
import { questionValidation } from "@/const/question";
import { MinusCircleOutlined } from "@ant-design/icons";
import { isNumber, isCharacter } from "@/const/question";

const { Option } = Select;

const Validator = (props: any) => {
	const { type, resetField } = props;

	return questionValidation[type].length !== 0 ? (
		<Form.Item label="validation" name="validator" style={{ width: "100%" }}>
			<Input.Group style={{ width: "100%", whiteSpace: "nowrap" }} compact>
				<Form.Item
					name={["validator", "type"]}
					style={{ width: "calc(100% - 43rem)" }}
				>
					<Select>
						{questionValidation[type].map((q: any) => {
							return (
								<Option value={q.value} key={q.value}>
									{q.display}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item
					noStyle
					shouldUpdate={(prevValue, currentValue) =>
						prevValue.validator?.type !== currentValue.validator?.type
					}
				>
					{({ getFieldValue }) => {
						//console.log(getFieldValue("validator"));
						const validator = getFieldValue("validator");
						return validator?.type !== isNumber ||
							validator?.type !== isCharacter ? (
							<Form.Item name={["validator", "length"]}>
								<InputNumber min={0} />
							</Form.Item>
						) : null;
					}}
				</Form.Item>
				<Form.Item name={["validator", "message"]} style={{ width: "50%" }}>
					<Input placeholder="Enter custom message ..." allowClear />
				</Form.Item>
				<Form.Item>
					<MinusCircleOutlined
						className="dynamic-delete-button"
						style={{ top: 0 }}
						onClick={() => resetField("validator")}
					/>
				</Form.Item>
			</Input.Group>
		</Form.Item>
	) : null;
};

export default Validator;

import { Checkbox, Form, Button, Input, Radio } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CHECKBOX, MULTIPLECHOICE, SHORT, PARAGRAPH } from "@/const/question";

const { TextArea } = Input;

const Answer = (props: any) => {
	let element = null;
	const { type, defaultValues } = props;

	//console.log(defaultValues);

	if (type === "") {
		element = null;
	}

	if (type === SHORT || type === PARAGRAPH) {
		element = (
			<Form.Item>
				<TextArea autoSize={type === SHORT ? { maxRows: 1 } : true} disabled />
			</Form.Item>
		);
	}

	if (type === CHECKBOX || type === MULTIPLECHOICE) {
		element = (
			<Form.List
				name="answer"
				initialValue={defaultValues || [{ content: "Option 1" }]}
			>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<Form.Item required={false} key={field.key}>
								<Form.Item noStyle>
									{type === CHECKBOX ? (
										<Checkbox disabled />
									) : (
										<Radio disabled />
									)}
								</Form.Item>
								<Form.Item {...field} name={[field.name, "content"]} noStyle>
									<Input
										placeholder="option ...."
										style={{
											width: "80%",
											marginLeft: "8px",
										}}
									/>
								</Form.Item>
								{fields.length > 1 && !defaultValues ? (
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() => remove(field.name)}
									/>
								) : null}
							</Form.Item>
						))}
						{!defaultValues ? (
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add({ content: "Other" })}
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
								<Form.ErrorList errors={errors} />
							</Form.Item>
						) : null}
					</>
				)}
			</Form.List>
		);
	}

	return element;
};

export default Answer;

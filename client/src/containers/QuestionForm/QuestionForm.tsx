import { useState, useEffect, useCallback } from "react";
import { Card, Form, Input, Button, Select, Switch, Space } from "antd";
import "./QuestionForm.scss";
import Answer from "@/components/Answer/Answer";
import { question } from "@/const/question";
import Validator from "@/components/Validator/Validator";
import { removeUndefinedValue } from "@/utills/utils";
const { Option } = Select;

export default function QuestionForm(props: any) {
	const { visible, setVisible } = props;
	const [form] = Form.useForm();
	const [type, setType] = useState("");

	const onFinish = (values: any) => {
		values = removeUndefinedValue(values);
		const { answers } = values;
		if (!answers) values.answer = [{ content: "" }];
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const handleChange = (value: any) => {
		setType(value);
	};

	const resetField = useCallback(
		(field: string) => {
			form.setFieldsValue({ [field]: undefined });
		},
		[form]
	);

	useEffect(() => {
		resetField("validator");
	}, [type, resetField]);

	useEffect(() => {
		if (!visible) {
			form.resetFields();
			setType("");
		}
	}, [visible, form]);

	return (
		<div
			className="question-form"
			style={visible ? undefined : { display: "none" }}
		>
			<Card>
				<Form
					form={form}
					name="basic"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout={"vertical"}
				>
					<Form.Item
						label="Question"
						name="questionText"
						rules={[
							{
								required: true,
								message: "Please input your question!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input size="small" />
					</Form.Item>
					<Form.Item label="Required" name="required" valuePropName="checked">
						<Switch />
					</Form.Item>
					<Form.Item
						label="Type"
						name="type"
						rules={[
							{
								required: true,
								message: "Please choose question's type!",
							},
						]}
					>
						<Select onChange={handleChange}>
							{question.map((q) => {
								return (
									<Option value={q.value} key={q.value}>
										{q.option}
									</Option>
								);
							})}
						</Select>
					</Form.Item>
					{type && <Answer type={type} />}
					{type && <Validator type={type} resetField={resetField} />}
					<Form.Item>
						<Space>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
							<Button
								htmlType="button"
								onClick={() => {
									setVisible(false);
								}}
							>
								Cancel
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

import { SHORT, PARAGRAPH, CHECKBOX, MULTIPLECHOICE } from "@/const/question";
import { Checkbox, Radio, Input, Form, Image, Row, Col } from "antd";
import { useState, useEffect } from "react";

const AnswerSubmit = (props: any) => {
	const { type, answer, name, required, disabled, validator } = props;
	const [rules, setRules] = useState([
		{ required: required, message: "This question is required" },
	]);

	const check = answer.filter((el: any) => el?.media);

	useEffect(() => {
		if (validator) {
			if (validator.type === "number") {
				setRules((r) => [
					...r,
					{
						transform: (value: any) => {
							if (value.length === 0) return;
							return +value;
						},
						...validator,
					},
				]);
			} else {
				setRules((r) => [...r, { ...validator }]);
			}
		}
	}, [validator]);

	let element = null;
	if (type === MULTIPLECHOICE) {
		element = (
			<Radio.Group>
				{check?.length > 0 ? (
					<Row gutter={[60, 40]} justify="space-evenly">
						{answer.map((a: any, idx: any) => {
							return (
								<Col
									key={idx}
									span={12}
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										gap: 10,
									}}
								>
									{a.media && (
										<Image
											src={a.media.url}
											height={190}
											width={"100%"}
											style={{ objectFit: "cover" }}
											preview={false}
										/>
									)}
									{!a.media && (
										<div
											style={{
												height: 200,
												width: "100%",
												background: "#d9d9d9",
											}}
										></div>
									)}
									<Radio value={a.content}>{a.content}</Radio>
								</Col>
							);
						})}
					</Row>
				) : (
					answer.map((a: any, idx: any) => {
						return (
							<div key={idx}>
								<Radio value={a.content}>{a.content}</Radio>
							</div>
						);
					})
				)}
			</Radio.Group>
		);
	}
	if (type === CHECKBOX) {
		element = (
			<Checkbox.Group disabled={disabled}>
				{check?.length > 0 ? (
					<Row gutter={[60, 40]} justify="space-evenly">
						{answer.map((a: any, idx: any) => {
							return (
								<Col
									key={idx}
									span={12}
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										gap: 10,
									}}
								>
									{a.media && (
										<Image
											src={a.media.url}
											height={190}
											width={"100%"}
											style={{ objectFit: "cover" }}
											preview={false}
										/>
									)}
									{!a.media && (
										<div
											style={{
												height: 200,
												width: "100%",
												background: "#d9d9d9",
											}}
										></div>
									)}
									<Checkbox value={a.content}>{a.content}</Checkbox>
								</Col>
							);
						})}
					</Row>
				) : (
					answer.map((a: any, idx: any) => {
						return (
							<div key={idx}>
								<Checkbox value={a.content}>{a.content}</Checkbox>
							</div>
						);
					})
				)}
			</Checkbox.Group>
		);
	}

	if (type === SHORT) {
		element = <Input.TextArea autoSize={{ maxRows: 1 }} allowClear />;
	}

	if (type === PARAGRAPH) {
		element = <Input.TextArea autoSize allowClear />;
	}

	return (
		<Form.Item name={name} rules={rules} style={{ marginBottom: 15 }}>
			{element}
		</Form.Item>
	);
};

export default AnswerSubmit;

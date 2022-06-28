import React from "react";
import "./SubmitFormPage.scss";
import { Card, Typography, Divider, Form, Button } from "antd";
import formDetail from "@/const/mockForm.json";
import AnswerSubmit from "@/components/Answer/AnswerSubmit";

const { Title } = Typography;

const SubmitFormPage: React.FC = () => {
	const onFinish = (values: any) => {
		//console.log("Success:", values);
		const response = [];
		for (const [questionId, answer] of Object.entries(values)) {
			if (answer) {
				response.push({ questionId, answer });
			}
		}
		console.log(response);
	};
	return (
		<>
			<div className="submit-form-page">
				<div className="form-title">
					<Card>
						<Typography>
							<Title>{formDetail.title}</Title>
						</Typography>
						{/* {formDetail.description && (
						<Card.Meta description={formDetail.description} />
					)} */}
					</Card>
				</div>
				<Divider />
				<Form layout="vertical" onFinish={onFinish}>
					{formDetail.questions.map((q: any) => {
						return (
							<Card key={q._id} className="question-list">
								<Form.Item label={q.questionText} required={q.required}>
									<AnswerSubmit
										name={q._id}
										type={q.type}
										answer={q.answer}
										required={q.required}
									/>
								</Form.Item>
							</Card>
						);
					})}
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default SubmitFormPage;

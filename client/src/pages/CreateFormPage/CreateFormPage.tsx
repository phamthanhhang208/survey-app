import { useState } from "react";
import { FunctionComponent } from "react";
import { Col, Button } from "antd";
import "./CreateFormPage.scss";
import Question from "@/components/Question/Question";
import QuestionForm from "@/containers/QuestionForm/QuestionForm";

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
	const [visible, setVisible] = useState(false);
	return (
		<Col span={12} offset={6}>
			<Button type="primary" block onClick={() => setVisible(!visible)}>
				Add a question
			</Button>
			<QuestionForm visible={visible} setVisible={setVisible} />
			<Question />
			<Button type="primary" block>
				View form
			</Button>
		</Col>
	);
};

export default CreateFormPage;

import { Card, Typography } from "antd";
import AnswerView from "../Answer/AnswerView";
const { Title } = Typography;

const QuestionListView = (props: any) => {
	const { questions } = props;
	return (
		<>
			{questions.map((q: any) => {
				return (
					<Card key={q._id}>
						<Title level={4}> {q.questionText}</Title>
						{q.description && <Card.Meta description={q.description} />}
						<br />
						<AnswerView answer={q.answer} type={q.type} />
					</Card>
				);
			})}
		</>
	);
};

export default QuestionListView;

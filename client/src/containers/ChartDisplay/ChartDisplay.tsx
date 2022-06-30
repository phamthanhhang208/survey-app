import { Card, Typography, Empty } from "antd";
import { SHORT, PARAGRAPH, CHECKBOX, MULTIPLECHOICE } from "@/const/question";
import PieChartDisplay from "@/components/Chart/PieChartDisplay";
import BarChartDisplay from "@/components/Chart/BarChartDisplay";
import ListDisplay from "@/components/Chart/ListDisplay";

const { Title } = Typography;
const ChartDisplay = (props: any) => {
	const { question } = props;
	let chart = null;

	const mergedResponseAndAnswer = question.answer.map((a: any) => {
		const r = question.responses.find(
			(item: any) => item.content === a.content
		);
		if (r) return r;

		return {
			content: a.content,
			count: 0,
		};
	});

	if (question.type === SHORT || question.type === PARAGRAPH) {
		chart = <ListDisplay dataset={question.responses} />;
	}
	if (question.type === CHECKBOX) {
		const labels = mergedResponseAndAnswer.map((m: any) => m.content);
		const dataset = mergedResponseAndAnswer.map((m: any) => m.count);
		chart = <BarChartDisplay labels={labels} dataset={dataset} />;
	}
	if (question.type === MULTIPLECHOICE) {
		const labels = mergedResponseAndAnswer.map((m: any) => m.content);
		const dataset = mergedResponseAndAnswer.map((m: any) => m.count);
		chart = <PieChartDisplay labels={labels} dataset={dataset} />;
	}
	return (
		<Card>
			<Title level={4}>{question.questionText}</Title>
			<Card.Meta description={`${question.records} responses`} />
			{question.records ? chart : <Empty />}
		</Card>
	);
};

export default ChartDisplay;

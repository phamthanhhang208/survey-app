import { Form, Pagination, Divider, Spin } from "antd";
import QuestionSubmit from "@/components/QuestionSubmit/QuestionSubmit";
import { useEffect, useState } from "react";
import { useGetResponse } from "@/hooks/response.hook";
import { useParams } from "react-router-dom";

const convertResponseData = (response: any) => {
	const arr = response.answers.map((r: any) => {
		const content = r.answer.map((a: any) => a.content).join();
		return {
			[r.questionId]: content,
		};
	});
	return Object.assign({}, ...arr);
};

export default function ViewResponse(props: any) {
	const { id } = useParams();
	const [form] = Form.useForm();
	const { formDetail } = props;

	const { responses, questions } = formDetail;

	const [responseId, setResponseId] = useState(responses[0]);

	const handleOnChange = (page: any) => {
		setResponseId(responses[page - 1]);
	};

	const { data: response, isLoading } = useGetResponse(id, responseId);

	useEffect(() => {
		if (response) {
			//console.log(convertResponseData(response));
			form.setFieldsValue(convertResponseData(response));
		}
	}, [response, form]);

	return (
		<>
			<Pagination
				simple
				defaultCurrent={1}
				onChange={handleOnChange}
				total={responses.length * 10}
			/>
			<Divider />
			{isLoading ? (
				<Spin />
			) : (
				<Form layout="vertical" form={form}>
					{questions.map((q: any) => {
						return <QuestionSubmit key={q._id} form={form} question={q} />;
					})}
				</Form>
			)}
		</>
	);
}

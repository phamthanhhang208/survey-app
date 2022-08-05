import {
	Form,
	Pagination,
	Divider,
	Spin,
	Button,
	Modal,
	Skeleton,
	Card,
	Typography,
} from "antd";
import QuestionSubmit from "@/components/QuestionSubmit/QuestionSubmit";
import { useEffect, useState } from "react";
import { useGetResponse, useDeleteResponse } from "@/hooks/response.hook";
import { useParams } from "react-router-dom";
import "./ViewResponse.scss";

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

	const [page, setPage] = useState(1);
	const [responseId, setResponseId] = useState(responses[0]);
	const [visible, setVisible] = useState(false);

	const handleOnChange = (page: any) => {
		setPage(page);
		setResponseId(responses[page - 1]);
	};

	const { data: response, isLoading } = useGetResponse(id, responseId);
	const { mutate: deleteResponse, isLoading: isDeletingResponse } =
		useDeleteResponse(id, responseId);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		deleteResponse();
		setVisible(false);
	};

	const handleCancel = () => {
		//console.log("Clicked cancel button");
		setVisible(false);
	};

	useEffect(() => {
		setResponseId(responses[page - 1]);
	}, [responses, page]);

	useEffect(() => {
		if (response) {
			//console.log(convertResponseData(response));
			form.resetFields();
			form.setFieldsValue(convertResponseData(response));
		}
	}, [response, form, responseId]);

	return (
		<div className="view-response" style={{ transform: "translateY(-80px)" }}>
			<div className="view-response-header">
				<Pagination
					simple
					defaultCurrent={page}
					onChange={handleOnChange}
					total={responses.length * 10}
				/>

				<Button onClick={showModal}>Delete Response</Button>
			</div>

			{/* <Divider /> */}
			{isLoading ? (
				<Skeleton active style={{ marginTop: 24 }} />
			) : (
				<Form layout="vertical" form={form} disabled style={{ marginTop: 20 }}>
					{!formDetail.isAllowAnonymous && (
						<Card>
							<Form.Item label={"Email"} required={true}>
								<Typography.Text strong>{response?.user || ""}</Typography.Text>
							</Form.Item>
						</Card>
					)}
					{questions.map((q: any) => {
						return (
							<QuestionSubmit
								key={q._id}
								form={form}
								question={q}
								disabled={true}
							/>
						);
					})}
				</Form>
			)}
			<Modal
				title="Delete Response"
				visible={visible}
				onOk={handleOk}
				confirmLoading={isDeletingResponse}
				onCancel={handleCancel}
			>
				<p>Are you sure you want to delete?</p>
				<p>Once deleted, this response can not be restore</p>
			</Modal>
		</div>
	);
}

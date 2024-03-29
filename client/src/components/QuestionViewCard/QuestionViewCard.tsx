import AnswerView from "@/components/Answer/AnswerView";
import QuestionEditModal from "@/components/Question/QuestionEditModal";
import {
	useDeleteQuestion,
	useEditQuestion,
	useDuplicateQuestion,
} from "@/hooks/question.hook";
import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
	Card,
	Divider,
	Form,
	Image,
	Modal,
	Popconfirm,
	Tooltip,
	Typography,
} from "antd";
import { FunctionComponent, useState } from "react";
import "./QuestionViewCard.scss";

interface QuestionViewCardProps {
	question: any;
	formId: any;
	ref?: any;
	provided?: any;
}

const QuestionViewCard: FunctionComponent<QuestionViewCardProps> = ({
	question,
	formId,
	ref,
	provided,
}) => {
	const { mutate: deleteQuestion } = useDeleteQuestion();
	const { mutate: duplicateQuestion } = useDuplicateQuestion();

	const handleCardDelete = (id: any) => {
		deleteQuestion({ id: formId, questionId: id });
	};

	const handleCardEdit = (questionId: any) => {
		showModal();
	};

	//modal related things
	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const { mutate: editQuestion } = useEditQuestion();
	const [form] = Form.useForm();

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = async (v: any) => {
		try {
			const formData = new FormData();
			formData.append("questionText", v.questionText);
			formData.append("type", v.type);
			formData.append("required", v.required);

			if (v?.validator) {
				Object.entries(v?.validator).forEach(([key, value]) => {
					if (value) {
						formData.append(`validator[${key}]`, value as any);
					}
				});
			}

			if (v?.description) {
				formData.append("description", v?.description);
			}

			if (v?.questionImage) {
				//change image
				if (v.questionImage?.fileList?.length > 0) {
					formData.append(
						"questionMedia",
						v.questionImage.fileList[0].originFileObj,
						v.questionImage.fileList[0].uid
					);
				}
				// question media unchanged
				if (v.questionImage?.url && v.questionImage?.filename) {
					formData.append("questionMedia[url]", v.questionImage.url);
					formData.append("questionMedia[filename]", v.questionImage.filename);
				}
			}

			switch (v.type) {
				case "multiple-choice":
					const arrMultipleChoice = [
						...v?.multipleChoice.map((c: any) => {
							if (c?.media?.filename && c?.media?.url) {
								return { content: c.content, media: c?.media };
							}
							if (c?.media?.fileList?.length > 0) {
								return { content: c.content, media: c.media?.fileList[0] };
							}
							return { content: c.content };
						}),
					];

					for (let i = 0; i < arrMultipleChoice.length; i++) {
						formData.append(
							`answer[${i}][content]`,
							arrMultipleChoice[i].content
						);
						if (arrMultipleChoice[i].media) {
							if (
								arrMultipleChoice[i].media?.url &&
								arrMultipleChoice[i].media?.filename
							) {
								formData.append(
									`answer[${i}][media][url]`,
									arrMultipleChoice[i].media.url
								);
								formData.append(
									`answer[${i}][media][filename]`,
									arrMultipleChoice[i].media.filename
								);
							} else {
								formData.append(
									`answer[${i}][media]`,
									arrMultipleChoice[i].media.originFileObj,
									arrMultipleChoice[i].media.uid
								);
							}
						}
					}

					break;
				case "checkboxes":
					const arrCheckbox = [
						...v?.checkboxes.map((c: any) => {
							if (c?.media?.filename && c?.media?.url) {
								return { content: c.content, media: c?.media };
							}
							if (c?.media?.fileList?.length > 0) {
								return { content: c.content, media: c.media?.fileList[0] };
							}
							return { content: c.content };
						}),
					];

					for (let i = 0; i < arrCheckbox.length; i++) {
						formData.append(`answer[${i}][content]`, arrCheckbox[i].content);
						if (arrCheckbox[i].media) {
							if (arrCheckbox[i].media?.url && arrCheckbox[i].media?.filename) {
								formData.append(
									`answer[${i}][media][url]`,
									arrCheckbox[i].media.url
								);
								formData.append(
									`answer[${i}][media][filename]`,
									arrCheckbox[i].media.filename
								);
							} else {
								formData.append(
									`answer[${i}][media]`,
									arrCheckbox[i].media.originFileObj,
									arrCheckbox[i].media.uid
								);
							}
						}
					}

					break;
				case "paragraph":
				case "short-paragraph":
					formData.append("answer[0][content]", "");
					break;

				default:
					break;
			}

			const req = editQuestion({
				id: formId,
				questionId: v?.questionId,
				values: formData,
			});

			setConfirmLoading(true);
			//const res =
			await req;
			//console.log(res);

			// form.resetFields();
		} catch (error) {
			console.log(error);
		}
		setVisible(false);
		setConfirmLoading(false);
	};

	const handleCancel = () => {
		//console.log('Clicked cancel button');
		setVisible(false);
	};

	const handleOk = () => {
		form.submit();
	};

	const handleCardDuplicate = (id: any) => {
		duplicateQuestion({ id: formId, questionId: id });
	};

	return (
		<div
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}
		>
			<Card className={"question-view-card"}>
				<Typography.Title level={4}>
					{question.questionText}{" "}
					{question?.required && <span style={{ color: "#AA1D2A" }}>*</span>}
				</Typography.Title>

				{question.description && (
					<Card.Meta description={question.description} />
				)}
				<br />
				{question?.questionMedia?.url ? (
					<Image
						style={{ marginBottom: 20 }}
						src={question?.questionMedia?.url}
					/>
				) : null}

				<AnswerView answer={question.answer} type={question.type} />

				<div>
					<Modal
						title="Edit question"
						visible={visible}
						onOk={handleOk}
						confirmLoading={confirmLoading}
						onCancel={handleCancel}
						destroyOnClose
						width={700}
						bodyStyle={{ paddingBottom: 10 }}
					>
						<Form
							form={form}
							className="question"
							onFinish={handleSubmit}
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
							labelAlign="left"
							labelWrap
						>
							<QuestionEditModal
								form={form}
								formId={formId}
								questionId={question._id}
							/>
						</Form>
					</Modal>

					<Divider />
					<div className="view-card-functions">
						<Tooltip title={"Duplicate"}>
							<CopyOutlined
								onClick={() => {
									handleCardDuplicate(question._id);
								}}
							/>
						</Tooltip>
						<Tooltip title={"Edit"}>
							<EditOutlined onClick={() => handleCardEdit(question._id)} />
						</Tooltip>
						<Tooltip title={"Delete"}>
							<Popconfirm
								title="Are you sure to delete this question?"
								onConfirm={() => handleCardDelete(question._id)}
								okText="Yes"
								cancelText="No"
							>
								<DeleteOutlined />
							</Popconfirm>
						</Tooltip>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default QuestionViewCard;

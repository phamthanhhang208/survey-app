import AnswerView from "@/components/Answer/AnswerView";
import QuestionEditModal from "@/components/Question/QuestionEditModal";
import { useDeleteQuestion, useDuplicateQuestion } from "@/hooks/question.hook";
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
}

const QuestionViewCard: FunctionComponent<QuestionViewCardProps> = ({
	question,
	formId,
}) => {
	const { mutate: deleteQuestion } = useDeleteQuestion();
	const { mutate: duplicateQuestion } = useDuplicateQuestion();

	const handleCardDelete = (id: any) => {
		deleteQuestion({ id: formId, questionId: id });
	};

	const handleCardEdit = (questionId: any) => {
		showModal();
	};

	const handleCardDuplicate = (id: any) => {
		duplicateQuestion({ id: formId, questionId: id });
	};

	//modal related things
	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		form.submit();
	};

	const handleSubmit = async (v: any) => {
		console.log("form", v);
	};

	const handleCancel = () => {
		console.log("Clicked cancel button");
		setVisible(false);
	};

	return (
		<div>
			<Card className={"question-view-card"}>
				<Typography.Title level={4}> {question.questionText}</Typography.Title>
				{question.description && (
					<Card.Meta description={question.description} />
				)}
				<br />
				{question?.questionMedia?.url ? (
					<Image src={question?.questionMedia?.url} />
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
									//console.log("copy", question._id);
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

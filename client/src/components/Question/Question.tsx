import { question as questionTypeList } from "@/const/question";
import useCurrentPermission from "@/hooks/useCurrentPermission";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import {
	Form,
	Input,
	Select,
	Radio,
	Checkbox,
	Divider,
	Switch,
	Tooltip,
	Popover,
} from "antd";
import { FunctionComponent, useState } from "react";
import RadioList from "@/components/RadioList/RadioList";
import CheckboxList from "@/components/CheckboxList/CheckboxList";
import "./Question.scss";
import { useDeleteQuestion } from "@/hooks/question.hook";
import { useParams } from "react-router-dom";

interface QuestionProps {
	fields?: any;
	field?: any;
	index?: any;
	remove?: any;
	id?: any;
	data?: any;
}

const Question: FunctionComponent<QuestionProps> = ({
	index,
	field,
	fields,
	id = "form-mock",
	data,
	...rest
}) => {
	const permission = useCurrentPermission();
	const [isQuestionDescriptionShown, setIsQuestionDescriptionShown] =
		useState<boolean>(() => (data?.description ? true : false));
	const [isValidatorShown, setIsValidatorShown] = useState(() =>
		data?.validator ? true : false
	);
	const [isRequired, setIsRequired] = useState(() =>
		data?.required ? true : false
	);
	const [questionTypeState, setQuestionTypeState] = useState<string>(
		() => data?.type
	);
	const [visible, setVisible] = useState(false);

	const { mutate: deleteQuestion } = useDeleteQuestion();
	const { id: formId } = useParams();

	const dynamicQuestion = (index?: any, answer?: any) => {
		switch (questionTypeState) {
			case "checkboxes":
				return (
					<Form.Item name={[index, "answer"]}>
						<Checkbox.Group name="checkbox-group" className={"radio-group"}>
							<CheckboxList answer={answer} />
						</Checkbox.Group>
					</Form.Item>
				);
			case "multiple-choice":
				return (
					<Form.Item name={[index, "answer"]}>
						<Radio.Group name="radio-group" className={"radio-group"}>
							<RadioList answer={answer} />
						</Radio.Group>
					</Form.Item>
				);
			case "short-paragraph":
				return (
					<Form.Item name={[index, "answer"]}>
						<Input
							disabled={permission === "edit" ? true : false}
							placeholder={"Answer"}
						></Input>
					</Form.Item>
				);
			case "paragraph":
				return (
					<Form.Item name={[index, "answer"]}>
						<Input.TextArea
							disabled={permission === "edit" ? true : false}
							placeholder={"Answer"}
						></Input.TextArea>
					</Form.Item>
				);
			default:
				break;
		}
	};

	const handleQuestionTypeChange = (v: any) => {
		setQuestionTypeState(v);
	};

	const handleVisibleChange = (newVisible: boolean) => {
		setVisible(newVisible);
	};

	return (
		<div className="question">
			<Form.Item
				name={[index, "questionText"]}
				label="Question"
				rules={[{ required: true }]}
			>
				<Input placeholder="Question" />
			</Form.Item>

			{isQuestionDescriptionShown && (
				<Form.Item name={[index, "description"]} label="Description">
					<Input.TextArea placeholder="Description" />
				</Form.Item>
			)}

			<Form.Item
				label="Type"
				name={[index, "type"]}
				rules={[{ required: true }]}
			>
				<Select
					placeholder={"Question type"}
					onChange={handleQuestionTypeChange}
				>
					{questionTypeList.map((q) => {
						return (
							<Select.Option value={q.value} key={q.value}>
								{q.option}
							</Select.Option>
						);
					})}
				</Select>
			</Form.Item>

			{dynamicQuestion(index, data?.answers)}

			{isValidatorShown && <div>Validation</div>}

			<Divider />

			<div className="question-functions">
				{fields.length > 0 ? (
					<Tooltip title={"Delete"} placement={"bottom"}>
						<DeleteOutlined
							size={20}
							className="dynamic-delete-button"
							type="primary"
							onClick={() => {
								deleteQuestion({ id: formId, questionId: data._id });
								rest.remove(field.name);
							}}
						/>
					</Tooltip>
				) : null}

				<Divider type="vertical" />

				<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
					<Form.Item
						label={"Required"}
						style={{
							flexDirection: "row",
							alignItems: "center",
							margin: "0",
							padding: 0,
						}}
						name={[index, "required"]}
						valuePropName="checked"
					>
						<Switch />
					</Form.Item>
					<Popover
						visible={visible}
						title="Show"
						onVisibleChange={handleVisibleChange}
						content={
							<Form.Item
								className="additional-fields"
								name={[index, "additionalFields"]}
								style={{ marginBottom: 0 }}
							>
								<Checkbox.Group name="question-description">
									<Checkbox
										checked={isQuestionDescriptionShown}
										value={"question-description"}
										onChange={(v) => {
											setVisible(false);
											setTimeout(() => {
												setIsQuestionDescriptionShown((prev) => !prev);
											}, 300);
										}}
									>
										Description
									</Checkbox>
									<Checkbox
										checked={isValidatorShown}
										value={"response-validation"}
										onChange={(v) => {
											setVisible(false);
											setTimeout(() => {
												setIsValidatorShown((prev) => !prev);
											}, 300);
										}}
									>
										Response validation
									</Checkbox>
								</Checkbox.Group>
							</Form.Item>
						}
						trigger="click"
						placement="bottom"
					>
						<MoreOutlined style={{ fontWeight: "900" }} />
					</Popover>
				</div>
			</div>
		</div>
	);
};

export default Question;

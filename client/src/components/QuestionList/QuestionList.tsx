import QuestionCreate from "@/components/Question/QuestionCreate";
import useCurrentPermission from "@/hooks/useCurrentPermission";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance } from "antd";
import { FunctionComponent } from "react";
import "./QuestionList.scss";

interface QuestionListProps {
	form?: FormInstance<any>;
	data?: any;
}

const QuestionList: FunctionComponent<QuestionListProps> = ({ form }) => {
	const permission = useCurrentPermission();

	// useEffect(() => {
	//   first;

	//   return () => {
	//     second
	//   }
	// }, [third])

	return (
		<Form.List name="questions">
			{(questions, { add, remove }) => {
				return (
					<div className="question-list">
						{questions.map((field, index) => (
							<div key={field.key}>
								<QuestionCreate
									field={field}
									index={index}
									fields={questions}
									remove={remove}
									data={form?.getFieldValue("questions")[index]}
								/>
							</div>
						))}

						{permission === "edit" && (
							<Button onClick={() => add()}>
								<PlusOutlined /> Add question
							</Button>
						)}
					</div>
				);
			}}
		</Form.List>
	);
};

export default QuestionList;

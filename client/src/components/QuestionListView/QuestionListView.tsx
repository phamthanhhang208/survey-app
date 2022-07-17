import QuestionViewCard from "@/components/QuestionViewCard/QuestionViewCard";
import { FunctionComponent, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useReorderedForm } from "@/hooks/form.hook";
import "./QuestionListView.scss";

const QuestionListView: FunctionComponent<any> = ({ questions, formId }) => {
	const [questionOrder, setQuestionOrder] = useState(questions);
	const { mutate: reorderItem } = useReorderedForm();

	const handleOnDragEnd = (result: any) => {
		// console.log(result);
		if (!result.destination) {
			return;
		}

		const items = Array.from(questionOrder);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setQuestionOrder(items);
		reorderItem({
			id: formId,
			questionIds: items.map((q: any) => q._id),
		});
	};

	useEffect(() => {
		setQuestionOrder((q: any) => questions);
	}, [questions]);

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="cards">
				{(provided) => (
					<div
						className="question-list-view"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{questionOrder.map((q: any, index: number) => {
							return (
								<Draggable key={q._id} draggableId={q._id} index={index}>
									{(provided) => (
										<QuestionViewCard
											question={q}
											key={q._id}
											formId={formId}
											provided={provided}
										/>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default QuestionListView;

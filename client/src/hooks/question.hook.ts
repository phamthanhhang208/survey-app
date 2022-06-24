import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { addQuestion, addManyQuestions, deleteQuestion } from "@/api/question";
import { useParams } from "react-router-dom";

export function useAddQuestion() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(addQuestion, {
		onSuccess: () => {
			message.success("Added question!");
			queryClient.invalidateQueries(["forms", "detail", id]);
		},
		onError: (error: any) => {
			console.log(error);
			message.error(error);
		},
		onMutate: () => {
			message.loading("loading");
		},
	});
}

export function useAddManyQuestions() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(addManyQuestions, {
		onSuccess: () => {
			message.success("Added many questions!");
			queryClient.invalidateQueries(["forms", "detail", id]);
		},
		onError: (error: any) => {
			console.log(error);
			message.error(error);
		},
		onMutate: () => {
			message.loading("loading");
		},
	});
}

export function useDeleteQuestion() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(deleteQuestion, {
		onSuccess: () => {
			message.success("Deleted question!");
			queryClient.invalidateQueries(["forms", "detail", id]);
		},
		onError: (error: any) => {
			console.log(error);
			message.error(error);
		},
		onMutate: () => {
			message.loading("loading");
		},
	});
}
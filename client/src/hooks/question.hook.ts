import { useMutation, useQueryClient, useQuery } from "react-query";
import { message } from "antd";
import {
	addQuestion,
	addManyQuestions,
	deleteQuestion,
	getQuestion,
	editQuestion,
	duplicateQuestion,
} from "@/api/question";
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
			message.error(error.response?.data);
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
			message.error(error.response?.data);
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
			message.error(error.response?.data);
		},
		onMutate: () => {
			message.loading("loading");
		},
	});
}

export function useGetQuestion(id: any, questionId: any) {
	//const { id } = useParams();
	return useQuery(
		["forms", "detail", id, "questions", questionId],
		() => getQuestion({ id: id, questionId: questionId }),
		{
			onError: (error: any) => {
				console.log(error);
				message.error(error.response?.data);
			},
		}
	);
}

export function useEditQuestion() {
	const queryClient = useQueryClient();
	const { id } = useParams();
	return useMutation(editQuestion, {
		onSuccess: () => {
			message.success("Modified question!");
			queryClient.invalidateQueries(["forms", "detail", id]);
			queryClient.invalidateQueries([
				"forms",
				"detail",
				id,
				"questions",
				//questionId,
			]);
		},
		onError: (error: any) => {
			console.log(error);
			message.error(error.response?.data);
		},
	});
}

export function useDuplicateQuestion() {
	const queryClient = useQueryClient();
	const { id } = useParams();
	return useMutation(duplicateQuestion, {
		onSuccess: () => {
			message.success("Added question!");
			queryClient.invalidateQueries(["forms", "detail", id]);
			queryClient.invalidateQueries(["forms", "detail", id, "questions"]);
		},
		onMutate: () => {
			message.loading("Loading...");
		},

		onError: (error: any) => {
			console.log(error);
			message.error(error.response?.data);
		},
	});
}

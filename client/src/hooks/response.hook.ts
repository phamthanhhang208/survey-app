import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import {
	getAllResponses,
	deleteResponse,
	addResponse,
	getResponse,
} from "@/api/response";
import { useParams } from "react-router-dom";

export function useGetAllResponses() {
	const { id } = useParams();
	return useQuery(["forms", "detail", id, "responses"], getAllResponses, {
		onError: (error: any) => {
			console.log(error);
			message.error("meaningful error message is comming soon");
		},
	});
}

export function useAddResponse() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(addResponse, {
		onSuccess: () => {
			message.success("Response send!");
			queryClient.invalidateQueries(["forms", "detail", id, "responses"]);
			//maybe navigate to else where in the future
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

export function useDeleteResponse() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(deleteResponse, {
		onSuccess: () => {
			message.success("Deleted response!");
			queryClient.invalidateQueries(["forms", "detail", id, "responses"]);
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

export function useGetResponse(id: any, responseId: any) {
	return useQuery(
		["forms", "detail", id, "responses", responseId],
		() => getResponse({ id: id, responseId: responseId }),
		{
			onError: (error: any) => {
				console.log(error);
				message.error("meaningful error message is comming soon");
			},
		}
	);
}

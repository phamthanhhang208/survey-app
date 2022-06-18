import { useQuery, useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { getAllResponses, deleteResponse } from "@/api/response";
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

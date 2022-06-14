import { useQuery, useMutation, useQueryClient } from "react-query";
import { getFormList, createForm, deleteForm, updateForm } from "@/api/form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export function useForms() {
	return useQuery("forms", getFormList, {
		onError: (error: any) => {
			console.log(error);
			message.error("meaningful error message is comming soon");
		},
	});
}

export function useCreateForm() {
	let navigate = useNavigate();

	return useMutation(createForm, {
		onSuccess: (data) => {
			//console.log(data);
			navigate(`/forms/${data}/edit`);
		},
		onError: (error: any) => {
			console.log(error);
			message.error("meaningful error message is comming soon");
		},
	});
}

export function useDeleteForm() {
	const queryClient = useQueryClient();

	return useMutation(deleteForm, {
		onSuccess: () => {
			message.success("Form deleted!");
			queryClient.invalidateQueries("forms");
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

export function useUpdateForm() {
	const queryClient = useQueryClient();
	return useMutation(updateForm, {
		onSuccess: () => {
			message.info("Modified");
			queryClient.invalidateQueries("formDetail");
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

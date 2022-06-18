import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	getFormList,
	createForm,
	deleteForm,
	updateForm,
	getForm,
	reorderFormQuestions,
	getFormAnalytic,
} from "@/api/form";
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
		onSuccess: (data: any) => {
			message.info("Modified");
			queryClient.invalidateQueries(["forms", "detail", data._id]);
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

export function useGetForm(id: any) {
	return useQuery(["forms", "detail", `${id}`], getForm, {
		onError: (error: any) => {
			console.log(error);
			message.error("meaningful error message is comming soon");
		},
	});
}

export function useReorderedForm() {
	const queryClient = useQueryClient();
	return useMutation(reorderFormQuestions, {
		onSuccess: (data: any) => {
			message.info("Modified");
			queryClient.invalidateQueries(["forms", "detail", data._id]);
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

export function useGetFormAnalytic(id: any) {
	return useQuery(["forms", "detail", `${id}`], getFormAnalytic, {
		onError: (error: any) => {
			console.log(error);
			message.error("meaningful error message is comming soon");
		},
	});
}

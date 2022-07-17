import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	getFormList,
	createForm,
	deleteForm,
	updateForm,
	getForm,
	reorderFormQuestions,
	getFormAnalytic,
	downloadFormAnalytic,
} from "@/api/form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { message } from "antd";

export function useForms() {
	return useQuery("forms", getFormList, {
		onError: (error: any) => {
			console.log(error);
			message.error(error.response?.data);
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
			message.error(error.response?.data);
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
			message.error(error.response?.data);
		},
		onMutate: () => {
			message.loading("loading");
		},
	});
}

export function useUpdateForm() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(updateForm, {
		onSuccess: () => {
			message.info("Modified");
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

export function useGetForm() {
	const { id } = useParams();
	return useQuery(["forms", "detail", `${id}`], () => getForm(id), {
		onError: (error: any) => {
			console.log(error);
			message.error(error.response?.data);
		},
	});
}

export function useReorderedForm() {
	const queryClient = useQueryClient();
	const { id } = useParams();

	return useMutation(reorderFormQuestions, {
		onSuccess: () => {
			message.info("Modified");
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

export function useGetFormAnalytic() {
	const { id } = useParams();
	return useQuery(
		["forms", "detail", id, "analytic"],
		() => getFormAnalytic(id),
		{
			onError: (error: any) => {
				console.log(error);
				//message.error("meaningful error message is comming soon");
				message.error(error.response?.data);
			},
		}
	);
}

export function useDownloadFormAnalytic() {
	const { id } = useParams();
	return useQuery(
		["forms", "detail", id, "analytics", "download"],
		() => downloadFormAnalytic(id),
		{
			enabled: false,
			onError: (error: any) => {
				console.log(error);
				message.error(error.response?.data);
			},
		}
	);
}

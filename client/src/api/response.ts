import axiosClient from "./axiosClient";

export const addResponse = async ({ id, values }: { id: any; values: any }) => {
	const { data } = await axiosClient.post(`/forms/${id}/responses`, {
		answers: values,
	});
	return data;
};
export const deleteResponse = async ({
	id,
	responseId,
}: {
	id: any;
	responseId: any;
}) => {
	const { data } = await axiosClient.delete(
		`/forms/${id}/responses/${responseId}`
	);
	return data;
};

export const getResponse = async ({
	id,
	responseId,
}: {
	id: any;
	responseId: any;
}) => {
	const { data } = await axiosClient.get(
		`/forms/${id}/responses/${responseId}`
	);
	return data;
};
export const getAllResponses = async (id: any) => {
	const { data } = await axiosClient.get(`/forms/${id}/responses`);
	return data;
};

export const deleteAllResponses = async (id: any) => {
	const { data } = await axiosClient.delete(`/forms/${id}/responses`);
	return data;
};

export const editQuestion = async ({
	id,
	responseId,
	values,
}: {
	id: any;
	responseId: any;
	values: any;
}) => {
	const { data } = await axiosClient.put(
		`/forms/${id}/responses/${responseId}`,
		{ ...values }
	);
	return data;
};

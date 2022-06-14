import axiosClient from "./axiosClient";

export const getFormList = async () => {
	const { data } = await axiosClient.get("/forms");
	return data;
};

export const createForm = async (values: any) => {
	const { data } = await axiosClient.post("/forms", values);
	return data;
};

export const deleteForm = async (id: any) => {
	const { data } = await axiosClient.delete(`/forms/${id}`);
	return data;
};

export const updateForm = async ({ id, values }: { id: any; values: any }) => {
	const { data } = await axiosClient.put(`/forms/${id}`, values);
	return data;
};

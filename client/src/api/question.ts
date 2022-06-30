import axiosClient from './axiosClient';

export const addQuestion = async ({ id, values }: { id: any; values: any }) => {
  try {
    const res = await axiosClient.post(`/forms/${id}/questions`, values);

    console.log(res);
    return res;
  } catch (error) {
    console.log('first');
    /**
     * Handle error
     */
  }
};
export const deleteQuestion = async ({
  id,
  questionId,
}: {
  id: any;
  questionId: any;
}) => {
  const { data } = await axiosClient.delete(
    `/forms/${id}/questions/${questionId}`
  );
  return data;
};
export const editQuestion = async ({
  id,
  questionId,
  values,
}: {
  id: any;
  questionId: any;
  values: any;
}) => {
  const { data } = await axiosClient.put(
    `/forms/${id}/questions/${questionId}`,
    values
  );
  return data;
};

export const addManyQuestions = async ({
  id,
  values,
}: {
  id: any;
  values: any;
}) => {
  const { data } = await axiosClient.post(
    `/forms/${id}/questions/many`,
    values
  );
  return data;
};

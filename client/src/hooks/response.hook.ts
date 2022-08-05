import { useQuery, useMutation, useQueryClient } from 'react-query';
import { message } from 'antd';
import {
  getAllResponses,
  deleteResponse,
  addResponse,
  getResponse,
  deleteAllResponses,
} from '@/api/response';
import { useNavigate, useParams } from 'react-router-dom';
import { routePaths } from '@/const/routePaths';

export function useGetAllResponses() {
  const { id } = useParams();
  return useQuery(['forms', 'detail', id, 'responses'], getAllResponses, {
    onError: (error: any) => {
      console.log(error);
      message.error(error.response?.data);
    },
  });
}

export function useAddResponse() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation(addResponse, {
    onSuccess: () => {
      message.success('Response send!');
      queryClient.invalidateQueries(['forms', 'detail', id, 'responses']);
      //maybe navigate to else where in the future
      navigate(routePaths.FORM_RESPONSE, { replace: true });
    },
    onError: (error: any) => {
      //console.log({ ...error });
      message.error(error.response?.data);
    },
    onMutate: () => {
      message.loading('loading');
    },
  });
}

export function useDeleteResponse(id: any, responseId: any) {
  const queryClient = useQueryClient();

  return useMutation(() => deleteResponse({ id: id, responseId: responseId }), {
    onSuccess: () => {
      message.success('Deleted response!');
      queryClient.invalidateQueries(['forms', 'detail', id]);
      queryClient.invalidateQueries(['forms', 'detail', id, 'responses']);
    },
    onError: (error: any) => {
      console.log(error);
      message.error(error.response?.data);
    },
    onMutate: () => {
      message.loading('loading');
    },
  });
}

export function useGetResponse(id: any, responseId: any) {
  return useQuery(
    ['forms', 'detail', id, 'responses', responseId],
    () => getResponse({ id: id, responseId: responseId }),
    {
      onError: (error: any) => {
        console.log(error);
        message.error(error.response?.data);
      },
    }
  );
}

export function useDeleteAllResponses() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation(() => deleteAllResponses(id), {
    onSuccess: () => {
      message.success('Deleted all responses!');
      queryClient.invalidateQueries(['forms', 'detail', id]);
      queryClient.invalidateQueries(['forms', 'detail', id, 'responses']);
    },
    onError: (error: any) => {
      console.log(error);
      message.error(error.response?.data);
    },
    onMutate: () => {
      message.loading('loading');
    },
  });
}

import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Cancel,
} from 'axios';
// import { checkApiResponse } from './checkApiResponse';

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/',
  headers: {
    // 'Content-Type': 'application/json',
  },
});

export interface EnhanceAxiosPromise<T> extends AxiosPromise<T> {
  /**
   * Request will be canceled if call this function
   */
  cancel: Function;
  /**
   * This function help check that request can be canceled or not
   */
  isCancelable: Function;
}

export interface EnhanceAxiosResponse<T> extends AxiosResponse<T, T> {
  /**
   * error
   */
  error?: any;
  /**
   * isOK
   */
  isSuccess: boolean;
}

export interface EnhanceAxiosRequestConfig<T> extends AxiosRequestConfig<T> {
  /**
   * This option will make timeout before request is executed
   */
  timeoutAction?: number;
  /**
   * This option will ignore throw error message by cancel request
   */
  throwCancelError?: boolean;
  /**
   * Auto notify error on screen
   */
  notifyError?: boolean;
  /**
   * readonlyOption
   */
  readonlyOption?: boolean;
}

const handleRequest =
  (baseOption?: AxiosRequestConfig<any>) =>
  (url: string, options?: EnhanceAxiosRequestConfig<any>) => {
    let timeoutActionCancel = -1;
    /**
     * This cancelFunction is used to cancel request
     */
    let cancelFunction: any;
    /**
     * If isCancelable === true then this request still can be canceled
     */
    let isCancelable = true;
    /**
     *
     */
    const throwCancelError = options?.throwCancelError || false;
    /**
     * Create new promise that return main axios request promise
     */
    const promise: EnhanceAxiosPromise<any> = new Promise((resolve, reject) => {
      const timeoutAction = options?.timeoutAction || 0;
      /**
       * Action function that will be executed after timeoutAction is end
       */
      const actionFunction = async () => {
        let errorClb: Function | undefined;
        try {
          const cancelTokenSource = axios.CancelToken.source();
          /** The Second definition of cancelFunction, it can be called if actionFunction is executed */
          cancelFunction = (clb?: Function) => {
            errorClb = clb;
            cancelTokenSource.cancel('Cancel request');
          };
          /**
           * Make axios request
           */
          const response = (await request({
            // baseURL: configs().BASE_URL,
            url,
            ...baseOption,
            ...options,
            headers: { 'Accept-Language': 'vi', ...options?.headers },
            cancelToken: cancelTokenSource.token,
            // timeout: 2000,
          })) as EnhanceAxiosResponse<any>;
          /**
           * resolve response when it come
           */

          // checkApiResponse({
          //   response,
          //   resolve,
          //   reject,
          //   notifyError: options?.notifyError,
          // });

          resolve(response);
          isCancelable = false;
        } catch (error: any) {
          /**
           * If error happened then notify the rejection
           */
          if (
            (!throwCancelError && error?.message !== 'Cancel request') ||
            throwCancelError
          )
            reject(error);
          isCancelable = false;
          if (errorClb) errorClb(error);
        }
      };
      /** The First definition of cancelFunction, it can be called if actionFunction is not executed */
      cancelFunction = (clb?: Function) => {
        clearTimeout(timeoutActionCancel);
        const canceler: Cancel = {
          message: 'Cancel request before timeoutAction value',
        };
        if (throwCancelError) reject(canceler);
        if (clb) clb(canceler);
      };
      timeoutActionCancel = window.setTimeout(actionFunction, timeoutAction);
    }) as EnhanceAxiosPromise<any>;
    promise.cancel = (clb?: Function) => {
      if (cancelFunction) cancelFunction(clb);
    };
    promise.isCancelable = () => isCancelable;

    return promise as EnhanceAxiosPromise<any>;
  };

export const api = {
  request: handleRequest(),
  get: handleRequest({ method: 'get' }),
  post: handleRequest({ method: 'post' }),
  delete: handleRequest({ method: 'delete' }),
  put: handleRequest({ method: 'put' }),
};

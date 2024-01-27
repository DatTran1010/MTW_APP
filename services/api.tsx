import axios, {CancelToken} from 'axios';
import * as asyncStorageItem from '../services/asyncStorageItem';

const callApi = async (
  endpoint: string,
  method: string,
  data: any = null,
  token: string = '',
  params: any = null,
) => {
  const controller = new AbortController();
  try {
    const baseURL = await asyncStorageItem.baseURL();
    console.log('URL', baseURL);
    const response = await axios.request({
      baseURL: baseURL,
      timeout: 5000,
      url: endpoint,
      method: method,
      data: data,
      params: params,
      headers: {Authorization: `Bearer ${token}`},
      signal: controller.signal,
      // signal: AbortSignal.timeout(5000),
    });
    setTimeout(() => {
      controller.abort();
    }, 9000);

    console.log('URL là', response.request.responseURL);

    if (response.status == 200) {
      return response;
    } else if (response.status == 204) {
      console.log('Log 204', response);

      return new Error('204');
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.log('Lỗi', error);
      //   console.log('responseURL', error.response.responseURL);
    }

    const errorFields = error.response.data.errors;
    if (errorFields === undefined) {
      throw error.message;
    } else {
      const errorMessage = errorFields[Object.keys(errorFields)[0]][0];
      throw errorMessage;
    }
  }
};
export default callApi;

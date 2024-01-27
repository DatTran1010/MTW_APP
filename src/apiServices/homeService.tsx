import callApi from '../../services/api';

export const getListMachine = async (
  TNgay: string,
  DNgay: string,
  loc: boolean,
  NNgu: number,
) => {
  try {
    const endpoint = '/api/motorwatchv2/listMachine';
    const method = 'GET';
    const data = null;
    const token = '';
    const params = {
      dTngay: TNgay,
      dDngay: DNgay,
      loc: loc,
      NNgu: NNgu,
    };

    // Gọi API và xử lý kết quả
    const response = await callApi(endpoint, method, data, '', params);
    // Xử lý kết quả đăng nhập
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};

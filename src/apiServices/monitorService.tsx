import callApi from '../../services/api';

export const getDataMonitor = async (
  TNgay: string,
  DNgay: string,
  ID_TB: number,
  NNgu: number,
) => {
  try {
    const endpoint = '/api/motorwatchv2/getDataMonitor';
    const method = 'GET';
    const data = null;
    const token = '';
    const params = {
      dTngay: TNgay,
      dDngay: DNgay,
      ID_TB: ID_TB,
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

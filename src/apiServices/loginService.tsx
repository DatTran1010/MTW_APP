import callApi from '../../services/api';

export const login = async (
  username: string,
  password: string,
  tokenDevies: string,
) => {
  try {
    const endpoint = '/api/account/login';
    const method = 'POST';
    const data = {
      userName: username,
      password: password,
      token: tokenDevies,
    };
    const token = '';
    const params = null;

    // Gọi API và xử lý kết quả
    const response = await callApi(endpoint, method, data, '', params);
    // Xử lý kết quả đăng nhập
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    return [];
  }
};

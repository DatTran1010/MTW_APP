import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../services/api";
import { setShowToast } from "./AppSlice";


// Tạo một action async để gọi API
export const fetchApiData = createAsyncThunk(
  "api/fetchData",
  async (
    { endpoint, method, data = null, token = "", params = null },
    thunkAPI
  ) => {
    try {
      const response = await callApi(endpoint, method, data, token, params);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setShowToast({apiSlice
          showToast: true,
          title: "Thông báo",
          body: error,
          type: "error",
        })
      );
      // Xử lý lỗi ở đây và throw lại lỗi để Redux Toolkit có thể kích hoạt action rejected
      throw error;
    }
  }
);

// Tạo slice
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default apiSlice.reducer;

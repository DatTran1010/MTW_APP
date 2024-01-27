import {createSlice} from '@reduxjs/toolkit';

interface InitalState {
  baseURL: string;
  overlay: boolean;
  toastContainer: {
    showToast: boolean;
    type: string;
    title: string;
    body: string;
  };
  showCamera: boolean;
  showResultCamera: boolean;
  resultScanned: string;
  userInfo: [
    {
      EMAIL: string;
      HO_TEN: string;
      MS_CN: string;
      MS_TO: string;
      NHOM_USER: string;
      SO_DTDD: string;
      TEN_DV: string;
      TEN_TO: string;
      USER_NAME: string;
      TOKEN: string;
      MS_DV: string;
    },
  ];
  notiferWarning: {
    showNotifer: boolean;
    label: string;
    label2: string;
  };
  showListNotification: boolean;
  notiferApp: [];
  heightHeaderNav: number;
  language: number;
  isShowModalUser: boolean;
  connectionHub: any;
  dataSaveUser: [
    {
      check: boolean;
      username: string;
      password: string;
    },
  ];
}

const initialState: InitalState = {
  baseURL: '',
  overlay: false,
  toastContainer: {
    showToast: false,
    type: 'info',
    title: 'Thông báo',
    body: '',
  },
  showCamera: false,
  showResultCamera: false,
  resultScanned: '',
  userInfo: [
    {
      EMAIL: '',
      HO_TEN: '',
      MS_CN: '',
      MS_TO: '',
      NHOM_USER: '',
      SO_DTDD: '',
      TEN_DV: '',
      TEN_TO: '',
      USER_NAME: '',
      TOKEN: '',
      MS_DV: '',
    },
  ],
  notiferWarning: {
    showNotifer: false,
    label: '',
    label2: '',
  },
  showListNotification: false,
  notiferApp: [],
  heightHeaderNav: 0,
  language: 0,
  isShowModalUser: false,
  connectionHub: null,
  dataSaveUser: [
    {
      check: false,
      username: '',
      password: '',
    },
  ],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      state.overlay = action.payload;
    },
    setShowToast: (state, action) => {
      state.toastContainer = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setShowCamera: (state, action) => {
      state.showCamera = action.payload;
    },
    setShowModalCamera: (state, action) => {
      state.showResultCamera = action.payload;
    },
    setResultScanned: (state, action) => {
      state.resultScanned = action.payload;
    },
    setBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
    setNotiferWarning: (state, action) => {
      state.notiferWarning = action.payload;
    },
    setShowListNotification: (state, action) => {
      state.showListNotification = action.payload;
    },
    setNotiferApp: (state, action) => {
      state.notiferApp = action.payload;
    },
    setHeightHeaderNavigation: (state, action) => {
      state.heightHeaderNav = action.payload;
    },
    setLanguaApp: (state, action) => {
      state.language = action.payload;
    },
    setShowModalUser: (state, action) => {
      state.isShowModalUser = action.payload;
    },
    setConnectionHub: (state, action) => {
      state.connectionHub = action.payload;
    },
    setDataSaveUser: (state, action) => {
      state.dataSaveUser = action.payload;
    },
  },
});

export const {
  setOverlay,
  setShowToast,
  setUserInfo,
  setShowCamera,
  setShowModalCamera,
  setResultScanned,
  setBaseURL,
  setNotiferWarning,
  setShowListNotification,
  setNotiferApp,
  setHeightHeaderNavigation,
  setLanguaApp,
  setShowModalUser,
  setConnectionHub,
  setDataSaveUser,
} = appSlice.actions;

export default appSlice.reducer;

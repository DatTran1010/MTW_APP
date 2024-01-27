import {configureStore} from '@reduxjs/toolkit';

// import apiSlice from './apiSlice';
import appReducer from './AppSlice';

const rootReducer = {
  app: appReducer,
  // api: apiSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

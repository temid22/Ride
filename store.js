import { configureStore } from '@reduxjs/toolkit';
import navSlice from './slices/navSlice';
import lightSlice from './slices/lightMode';
// ...
const store = configureStore({
  reducer: {
    nav: navSlice,
  },
});

export default store;

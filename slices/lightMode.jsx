import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lightMode: 'dark',
};

export const lightSlice = createSlice({
  name: 'light',
  initialState,
  reducers: {
    setLightMode: (state, action) => {
      state.lightMode = action.payload;
    },
  },
});

export const { setLightMode } = lightSlice.actions;

export const selectLightMode = (state) => state.light.lightMode;

export default lightSlice.reducer;

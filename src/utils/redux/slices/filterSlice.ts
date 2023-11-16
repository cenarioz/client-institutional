import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: [],
  keyword: "",
  minimumHours: [0, 0],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    submittedFilterForm: (state, action) => {
      state.price = action.payload.price;
      state.keyword = action.payload.keyword;
      state.minimumHours = action.payload.minimumHours;
    },
    cleanFilterForm: (state) => {
      state.price = [];
      state.keyword = "";
      state.minimumHours = [0, 0];
    },
  },
});

export const { submittedFilterForm, cleanFilterForm } = filterSlice.actions;
export default filterSlice.reducer;

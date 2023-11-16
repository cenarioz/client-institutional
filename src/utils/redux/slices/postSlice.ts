// reducers/searchReducer.js
import { IPlace } from "@/commons/@types/place";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IPlace[] = [];

const postSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    submitted: (state, action) => {
      state = action.payload;
    },
  },
});

export const { submitted } = postSlice.actions;
export default postSlice.reducer;

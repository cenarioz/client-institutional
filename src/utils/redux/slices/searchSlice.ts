// reducers/searchReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: null,
  location: null,
  when: "",
  howManyPeople: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    submited: (state, action) => {
      state.event = action.payload.event;
      state.location = action.payload.location;
      state.howManyPeople = action.payload.howManyPeople;
    },
    cleanForm: (state) => {
      state.event = null;
      state.location = null;
      state.howManyPeople = "";
    },
  },
});

export const { submited, cleanForm } = searchSlice.actions;
export default searchSlice.reducer;

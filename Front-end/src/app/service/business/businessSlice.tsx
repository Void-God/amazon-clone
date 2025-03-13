import { createSlice } from "@reduxjs/toolkit";
interface BuisinessState {
  data: [],
  total: number
}
const initialState: BuisinessState = {
  data: [],
  total: 0
};
const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    busienss: (state, action) => {
      console.log(action.payload,"this is data");
      
      const { businesses, total } = action.payload
      state.data = businesses
      state.total = total
    },
  },
});

export const { busienss } = businessSlice.actions;
export default businessSlice.reducer;

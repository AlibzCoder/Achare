import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export const addressStore = createSlice({
  name: "address",
  initialState: {
    addresses: [],
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
});

export const { setAddresses } = addressStore.actions;

export const addressesSelector = (state : RootState) => state.address.addresses;

export default addressStore.reducer;

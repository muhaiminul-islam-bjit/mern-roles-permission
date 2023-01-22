import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const storeSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {},
});

export const { } = storeSlice.actions;
export default storeSlice.reducer;
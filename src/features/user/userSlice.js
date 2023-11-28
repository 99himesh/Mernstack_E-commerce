import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedinUSerOrder } from './userapi';

const initialState = {
  userOrders: [],
  status: 'idle',
};

export const fetchLoggedinUSerOrderAsync = createAsyncThunk(
  'user/fetchLoggedinUSerOrder',
  async (useId) => {
    const response = await fetchLoggedinUSerOrder(useId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedinUSerOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedinUSerOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;


export const selectUserOrder = (state) => state.user.userOrders;


export default userSlice.reducer;

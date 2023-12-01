import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedinUSer, fetchLoggedinUSerOrder, updateUser } from './userapi';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo:null
};

export const fetchLoggedinUSerOrderAsync = createAsyncThunk(
  'user/fetchLoggedinUSerOrder',
  async (useId) => {
    const response = await fetchLoggedinUSerOrder(useId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchLoggedinUSerAsync = createAsyncThunk(
  'user/fetchLoggedinUSer',
  async (useId) => {
    const response = await fetchLoggedinUSer(useId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (useId) => {
    const response = await updateUser(useId);
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
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedinUSerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedinUSerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
        console.log(state.userInfo);
      })
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;


export const selectUserOrder = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;


export default userSlice.reducer;

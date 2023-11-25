import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cheackUser, createUser, updateUser } from './authApi';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const cheackUserAsync = createAsyncThunk(
  'user/cheackUser',
  async (loggedinInfo) => {
    const response = await cheackUser(loggedinInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
    
  },

  extraReducers: (bulilder) => {
    bulilder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(cheackUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cheackUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(cheackUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectLoggedInUser=(state)=>state.auth.loggedInUser;
export const seletError=(state)=>state.auth.error;


export default counterSlice.reducer;

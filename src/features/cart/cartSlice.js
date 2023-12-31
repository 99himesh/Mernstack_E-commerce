import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteCart, fetchItemByUserId, reseCart, updateCart } from './cartAPI';

const initialState = {
  status: "idle",
  items:[],
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async (userId) => {
    const response = await fetchItemByUserId(userId );
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update );
    return response.data;
  }
);
export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (itemId) => {
    const response = await deleteCart(itemId);
    return response.data;
  }
);
export const reseCartAsync = createAsyncThunk(
  'cart/reseCart',
  async (id) => {
    const response = await reseCart(id );
    return response.data;
  }
);


export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload)
        console.log(state.items);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(reseCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reseCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[]
      })
  },
});

export const {} = counterSlice.actions;
 

export const selectCart = (state) => state.cart.items;


export default counterSlice.reducer;

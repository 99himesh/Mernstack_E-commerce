import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllProductsByFilter, fetchProdductbyId } from './productApi';

const initialState = {
  products: [],
  selectedProduct:[],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchAllProductsByFilterAsync = createAsyncThunk(
  'product/fetchAllProductsByFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchAllProductsByFilter(filter,sort,pagination);
    return response.data;
  }
);

export const fetchProducctByidAsync = createAsyncThunk(
  'selectedProduct/fetchProdductbyId',
  async (id) => {
    console.log("id");
    const response = await fetchProdductbyId(id);
    return response.data; 
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducctByidAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducctByidAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
  },
});

export const {  } = productSlice.actions;


export const selectAllProduct = (state) => state.product.products;
export const selectedProduct = (state) => state.product.selectedProduct;



export default productSlice.reducer;

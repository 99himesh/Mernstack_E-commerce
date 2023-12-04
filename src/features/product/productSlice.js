import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllProducts, fetchAllProductsByFilter, fetchProdductbyId, updateProduct } from './productApi';

const initialState = {
  products: [],
  selectedProductByIDs:[],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
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
    console.log("product id");
    const response = await fetchProdductbyId(id);
    return response.data; 
  }
);

export const updateProductAsync = createAsyncThunk(
  'selectedProduct/updateProduct',
  async (product) => {
    console.log("id");
    const response = await updateProduct(product);
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
        state.selectedProductByIDs = action.payload;
        console.log(state.selectedProductByIDs);
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         const index=state.products.findIndex(product=>product.id==action.payload.id)
         state.products[index]=action.payload
       })
  },
});

export const {  } = productSlice.actions;


export const selectAllProduct = (state) => state.product.products;
export const selectedProduct = (state) => state.product.selectedProductByIDs;



export default productSlice.reducer;

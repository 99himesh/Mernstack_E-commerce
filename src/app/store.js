import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/product/productSlice.js"
import authReduer from "../features/auth/authSlice.js"
import cartReducer from "../features/cart/cartSlice.js"
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReduer,
    cart:cartReducer

  },
});

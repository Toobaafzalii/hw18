import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  ) as ICartProduct[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
      } else {
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCartItem: (state, action) => {
      const product = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      console.log(product, action);
      if (product) {
        if (action.payload.action === "INCREASE")
          product.quantity = product.quantity + 1;
        if (action.payload.action === "DECREASE")
          product.quantity = product.quantity - 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions;
export default store;

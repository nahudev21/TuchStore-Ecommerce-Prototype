import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: null
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUpdateCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state, action) => {
      state.cart = null
    }
  }
})

export const { setUpdateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
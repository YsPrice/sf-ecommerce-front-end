import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartItemId: null
};



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem: (state, action) => {
      const { product, quantity, cartItemId } = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        const newItem = {
          ...product,
          quantity,
          cartItemId
        };
       
        state.items.push(newItem);
   
      
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },


    removeItem: (state, action) => {
    
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  },
  


  updateItemQuantity: (state, action) => {
  
    const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
  
    if (existingIndex >= 0) {

      const quantityDifference = action.payload.quantity - state.items[existingIndex].quantity;

      state.items[existingIndex].quantity = action.payload.quantity;
  
      state.totalQuantity += quantityDifference;
      state.totalPrice += quantityDifference * state.items[existingIndex].price;
    }
  },

    
    clearCart: state => {
      Object.assign(state, initialState);
    },
  }
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

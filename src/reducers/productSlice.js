import { createSlice } from '@reduxjs/toolkit';

const initialState = {
currentProductId: null,



}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentProductId: (state, action) => {
            state.currentProductId = action.payload;
        },
        resetProduct: () => initialState
    }
});
export const { setCurrentProductId, resetProduct } = productSlice.actions;
export default productSlice.reducer;
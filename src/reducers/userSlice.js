import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { registerUserApi,loginUserApi, logoutUserApi} from "../api/services/userServices";



export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, thunkAPI) => {
      try {
        const response = await registerUserApi(userData); 
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const signInUser = createAsyncThunk(
    'user/SignInUser',
    async (userData, thunkAPI) => {
      try {
        const response = await loginUserApi(userData); 
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  export const signOutUser = createAsyncThunk(
      'user/logOut',
      async (thunkAPI) => {
          try{
            const response = await logoutUserApi(); 
            return response.data
          }
          catch (error){
              return thunkAPI.rejectWithValue(error.response.data)
          }
      }
  )
  
const initialState = {
 currentUser: null,
 isSignedIn:false,
 cartId: null

}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
    setUser: (state,action)=> {
        state.currentUser = action.payload;
        state.isSignedIn = true;
    },
    setCart: (state,action) => {
      state.cartId = action.payload;
    },
    resetUser: (state) => {
    state.currentUser = null;
    state.isSignedIn =false;
    state.cartId = null
    }
},
extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload; 
        state.registrationSuccess = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.error.message
        state.isError = true;
     
    });
    builder


      .addCase(signInUser.fulfilled, (state, action) => {
        state.userData = action.payload; 
        state.signInSuccess = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInError = action.error.message
        state.isError = true;
      });
  },
});
export const {setUser, resetUser,setCart} = userSlice.actions
export default userSlice.reducer;
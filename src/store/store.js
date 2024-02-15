import {configureStore,combineReducers, applyMiddleware, compose } from '@reduxjs/toolkit';
import productReducer from '../reducers/productSlice';
import {thunk} from 'redux-thunk';
import cartReducer from '../reducers/cartSlice';
import userReducer from '../reducers/userSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  const persistConfig = {
    version:1,
    key: "root",
    storage,
  };

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  export const persistor = persistStore(store)

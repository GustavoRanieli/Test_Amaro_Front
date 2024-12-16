import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slices';
import productReducer from '../slices/product.slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
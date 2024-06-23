import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { burgerConstructorSlice } from '../services/slices/burgerConstructorSlice';
import { userSlice } from '../services/slices/userSlice';
import { feedSlice } from '../services/slices/feedSlice';
import { ordersSlice } from '../services/slices/ordersSlice';
import { orderSlice } from '../services/slices/orderSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});

export default rootReducer;

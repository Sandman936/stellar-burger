import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { burgerConstructorSlice } from '../services/slices/burgerConstructorSlice';
import { feedSlice } from '../services/slices/feedSlice';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { orderSlice } from '../services/slices/orderSlice';
import { ordersSlice } from '../services/slices/ordersSlice';
import { userSlice } from '../services/slices/userSlice';

const initialRootReducerState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [ordersSlice.name]: ordersSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState()
};

describe('Тест инициализации rootReduce', () => {
  test('Проверка работы rootReduce', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    expect(initialRootReducerState).toEqual(store.getState());
  });
  test('Вызов rootReduce с неизвестным экшеном', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(initialRootReducerState, action);

    expect(state).toEqual(initialRootReducerState);
  });
});

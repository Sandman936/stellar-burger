import { RequestStatus } from '@utils-types';
import { clearOrderData, orderSlice, initialState } from './orderSlice';
import { getOrder, postOrder } from '../thunks';
import { configureStore } from '@reduxjs/toolkit';

const expectedResult: typeof initialState = {
  order: {
    _id: '66830351856777001bb1efe6',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-07-01T19:28:17.462Z',
    updatedAt: '2024-07-01T19:28:17.853Z',
    number: 44752
  },
  name: 'Флюоресцентный люминесцентный бургер',
  status: RequestStatus.Success,
  error: undefined
};

describe('Тест редьюсера слайса orderSlice', () => {
  describe('Проверка экшенов оформления заказа', () => {
    test('Проверка экшена ожидания оформления заказа', () => {
      const state = orderSlice.reducer(
        initialState,
        postOrder.pending('order/post', expectedResult.order!.ingredients)
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешного оформления заказа', () => {
      const state = orderSlice.reducer(
        initialState,
        postOrder.fulfilled(
          {
            success: true,
            name: 'Флюоресцентный люминесцентный бургер',
            order: expectedResult.order!
          },
          'order/post',
          expectedResult.order!.ingredients
        )
      );

      expect(state).toEqual(expectedResult);
    });
    test('Проверка экшена неудачного оформления заказа', () => {
      const state = orderSlice.reducer(
        initialState,
        postOrder.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'order/post',
          expectedResult.order!.ingredients
        )
      );

      expect(state).toEqual({
        order: null,
        name: '',
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
  describe('Проверка экшенов получения информации о заказе', () => {
    test('Проверка экшена ожидания получения информации о заказе', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrder.pending('order/get', expectedResult.order!.number)
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешного получения информации о заказе', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrder.fulfilled(
          {
            success: true,
            orders: [expectedResult.order!]
          },
          'order/get',
          expectedResult.order!.number
        )
      );

      expect(state).toEqual({ ...expectedResult, name: '' });
    });
    test('Проверка экшена неудачного получения информации о заказе', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrder.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'order/get',
          expectedResult.order!.number
        )
      );

      expect(state).toEqual({
        order: null,
        name: '',
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
  describe('Проверка экшенов для работы с данными', () => {
    test('Проверка экшена очистки данных о заказе', () => {
      const orderStore = configureStore({
        reducer: orderSlice.reducer,
        preloadedState: expectedResult
      });

      orderStore.dispatch(clearOrderData());

      expect(orderStore.getState()).toEqual({
        order: null,
        name: '',
        status: RequestStatus.Idle,
        error: undefined
      });
    });
  });
});

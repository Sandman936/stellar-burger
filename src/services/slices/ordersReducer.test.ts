import { RequestStatus, TOrder } from '@utils-types';
import { getOrders } from '../thunks';
import { ordersSlice, initialState } from './ordersSlice';

const expectedResult: typeof initialState = {
  orders: [
    {
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
    {
      _id: '66706ed9856777001bb1ba5f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бессмертный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-07-01T19:28:17.462Z',
      updatedAt: '2024-07-01T19:28:17.853Z',
      number: 43100
    }
  ],
  status: RequestStatus.Success,
  error: undefined
};

describe('Тест редьюсера слайса ordersSlice', () => {
  describe('Проверка экшенов получения заказов', () => {
    test('Проверка экшена ожидания получения заказов', () => {
      const state = ordersSlice.reducer(
        initialState,
        getOrders.pending('orders/getAll')
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешного получения заказов', () => {
      const state = ordersSlice.reducer(
        initialState,
        getOrders.fulfilled(expectedResult.orders, 'orders/getAll')
      );

      expect(state).toEqual(expectedResult);
    });
    test('Проверка экшена неудачного получения заказов', () => {
      const state = ordersSlice.reducer(
        initialState,
        getOrders.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'orders/getAll'
        )
      );

      expect(state).toEqual({
        orders: [],
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
});

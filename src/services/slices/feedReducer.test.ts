import { RequestStatus, TOrder } from '@utils-types';
import { feedSlice } from './feedSlice';
import { getFeeds } from '../thunks';

interface initialState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
  error: string | undefined;
}

const initialState: initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle,
  error: undefined
};

const expectedResult: initialState = {
  orders: [
    {
      _id: '6680e12d856777001bb1ebc4',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-30T04:38:05.274Z',
      updatedAt: '2024-06-30T04:38:05.741Z',
      number: 44694
    },
    {
      _id: '6680e101856777001bb1ebc2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-30T04:37:21.607Z',
      updatedAt: '2024-06-30T04:37:22.005Z',
      number: 44693
    }
  ],
  total: 44368,
  totalToday: 38,
  status: RequestStatus.Success,
  error: undefined
};

describe('Тест редьюсера слайса feedSlice', () => {
  test('Проверка экшена ожидания запроса на получение ленты заказов', () => {
    const state = feedSlice.reducer(
      initialState,
      getFeeds.pending('feed/getAll')
    );

    expect(state.status).toBe('Loading');
  });
  test('Проверка экшена успешного получения ленты заказов', () => {
    const state = feedSlice.reducer(
      initialState,
      getFeeds.fulfilled({ success: true, ...expectedResult }, 'feed/getAll')
    );

    expect(state).toEqual(expectedResult);
  });
  test('Проверка экшена неудачного получения ленты заказов', () => {
    const state = feedSlice.reducer(
      initialState,
      getFeeds.rejected(
        { message: 'Неизвестная ошибка', name: 'Ошибка' },
        'feed/getAll'
      )
    );

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Rejected,
      error: 'Неизвестная ошибка'
    });
  });
});

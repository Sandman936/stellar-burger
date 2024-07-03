import { RequestStatus, TIngredient } from '@utils-types';
import { fetchIngridents } from '../thunks';
import { ingredientsSlice, initialState } from './ingredientsSlice';

const expectedResult: typeof initialState = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ],
  status: RequestStatus.Success,
  error: undefined
};

describe('Тест редьюсера слайса ingredientsSlice', () => {
  test('Проверка экшена ожидания запроса на получение списка ингридиентов', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngridents.pending('ingredients/getAll')
    );

    expect(state.status).toBe('Loading');
  });
  test('Проверка экшена успешного получения списка ингридиентов', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngridents.fulfilled(
        expectedResult.ingredients,
        'ingredients/getAll'
      )
    );

    expect(state).toEqual(expectedResult);
  });
  test('Проверка экшена неудачного получения списка ингридиентов', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngridents.rejected(
        { message: 'Неизвестная ошибка', name: 'Ошибка' },
        'ingredients/getAll'
      )
    );

    expect(state).toEqual({
      ingredients: [],
      status: RequestStatus.Rejected,
      error: 'Неизвестная ошибка'
    });
  });
});

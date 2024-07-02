import { configureStore } from '@reduxjs/toolkit';
import {
  addItemToConstructor,
  burgerConstructorSlice,
  moveItemDown,
  moveItemUp,
  removeItemFromConstructor
} from './burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface mockDataState {
  bun: TConstructorIngredient;
  items: TConstructorIngredient[];
}

const mockData: mockDataState = {
  bun: {
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: 'ec951545-0fdf-494e-80f8-efe37a95426d'
  },
  items: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '955fbfe6-5b1e-404f-bc44-0a11ee0a9003'
    },
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      id: 'a7d85513-b88c-4ea6-814e-4a926557dcf2'
    }
  ]
};

const mockDataToAdd: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
  }
];

const mockDataSortedItems: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    id: 'a7d85513-b88c-4ea6-814e-4a926557dcf2'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '955fbfe6-5b1e-404f-bc44-0a11ee0a9003'
  }
];

const store = configureStore({
  reducer: burgerConstructorSlice.reducer,
  preloadedState: mockData
});

describe('Тест редьюсера слайса burgerConstructor', () => {
  test('Обработка экшена сортировки ингредиентов в начинке', () => {
    //Перемещаем ингридиент на позицию выше
    store.dispatch(moveItemUp(1));

    //Проверяем что список ингридиентов соотвествует отсортированному массиву
    expect(store.getState().items).toEqual(mockDataSortedItems);

    //Перемещаем ингридиент на позицию ниже
    store.dispatch(moveItemDown(0));

    //Проверяем что список ингридиентов соотвествует начальному массиву
    expect(store.getState().items).toEqual(mockData.items);
  });
  test('Обработка экшена добавления ингредиента', () => {
    //Добавляем ингредиент в конструктор
    store.dispatch(addItemToConstructor(mockDataToAdd[1]));
    //Добавляем булочку в конструктор
    store.dispatch(addItemToConstructor(mockDataToAdd[0]));

    //Проверяем что ингридиентов стало больше на 1
    expect(store.getState().items.length).toEqual(mockData.items.length + 1);
    //Проверяем что id булочки поменялся в конструкторе
    expect(store.getState().bun?._id).not.toBe(mockData.bun._id);
  });
  test('Обработка экшена удаления ингредиента', () => {
    //Удаляем ингридиент из конструктора
    store.dispatch(removeItemFromConstructor(mockData.items[0]));

    //Проверяем что в конструкторе нет ингридиента, который мы удалили
    expect(store.getState().items.includes(mockData.items[0])).toBe(false);
  });
});

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

interface constructorState {
  bun: TIngredient | null;
  items: TConstructorIngredient[];
}

const initialState: constructorState = {
  bun: null,
  items: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addItemToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.items.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => ({
        payload: { ...item, id: uuid() }
      })
    },
    removeItemFromConstructor(
      state,
      action: PayloadAction<TConstructorIngredient>
    ) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    moveItemUp(state, action: PayloadAction<number>) {
      [state.items[action.payload - 1], state.items[action.payload]] = [
        state.items[action.payload],
        state.items[action.payload - 1]
      ];
    },
    moveItemDown(state, action: PayloadAction<number>) {
      [state.items[action.payload], state.items[action.payload + 1]] = [
        state.items[action.payload + 1],
        state.items[action.payload]
      ];
    },
    clearItems(state) {
      state.bun = null;
      state.items = [];
    }
  },
  selectors: {
    selectorBun: (state: constructorState) => state.bun,
    selectorItems: (state: constructorState) => state.items
  }
});

export const {
  addItemToConstructor,
  removeItemFromConstructor,
  moveItemUp,
  moveItemDown,
  clearItems
} = burgerConstructorSlice.actions;

export const selectorBurgerConstructor = burgerConstructorSlice.selectors;

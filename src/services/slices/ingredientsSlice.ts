import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { fetchIngridents } from '../thunks';

interface IngredientsState {
  ingredients: TIngredient[];
  status: RequestStatus;
}

const initialState: IngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngridents.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchIngridents.rejected, (state) => {
        state.status = RequestStatus.Rejected;
      })
      .addCase(
        fetchIngridents.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.status = RequestStatus.Success;
          state.ingredients = action.payload;
        }
      );
  },
  selectors: {
    selectorIngredientsData: (state: IngredientsState) => state.ingredients,
    selectorIngredientsStatus: (state: IngredientsState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;

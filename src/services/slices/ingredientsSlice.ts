import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { fetchIngridents } from '../thunks';

interface IngredientsState {
  ingredients: TIngredient[];
  status: RequestStatus;
  error: string | undefined;
}

export const initialState: IngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle,
  error: undefined
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
      .addCase(fetchIngridents.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(
        fetchIngridents.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.status = RequestStatus.Success;
          state.ingredients = action.payload;
          state.error = undefined;
        }
      );
  },
  selectors: {
    selectorIngredientsData: (state: IngredientsState) => state.ingredients,
    selectorIngredientsStatus: (state: IngredientsState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;

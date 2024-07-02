import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrder, postOrder } from '../thunks';

interface OrderState {
  order: TOrder | null;
  name: string;
  status: RequestStatus;
  error: string | undefined;
}

const initialState: OrderState = {
  order: null,
  name: '',
  status: RequestStatus.Idle,
  error: undefined
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData(state) {
      state.order = null;
      state.name = '';
      state.status = RequestStatus.Idle;
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<{ order: TOrder; name: string }>) => {
          state.status = RequestStatus.Success;
          state.order = action.payload.order;
          state.name = action.payload.name;
        }
      )
      .addCase(getOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(
        getOrder.fulfilled,
        (state, action: PayloadAction<{ orders: TOrder[] }>) => {
          state.status = RequestStatus.Success;
          state.order = action.payload.orders[0];
        }
      );
  },
  selectors: {
    selectorOrder: (state: OrderState) => state.order,
    selectorOrderStatus: (state: OrderState) => state.status,
    selectorOrderName: (state: OrderState) => state.name
  }
});

export const { selectorOrder, selectorOrderStatus, selectorOrderName } =
  orderSlice.selectors;

export const { clearOrderData } = orderSlice.actions;

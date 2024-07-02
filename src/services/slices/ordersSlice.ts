import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrders } from '../thunks';

interface OrdersState {
  orders: TOrder[];
  status: RequestStatus;
  error: string | undefined;
}

const initialState: OrdersState = {
  orders: [],
  status: RequestStatus.Idle,
  error: undefined
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.status = RequestStatus.Success;
          state.orders = action.payload;
        }
      );
  },
  selectors: {
    selectorOrders: (state: OrdersState) => state.orders
  }
});

export const { selectorOrders } = ordersSlice.selectors;

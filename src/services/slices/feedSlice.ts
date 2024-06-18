import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import { getFeeds } from '../thunks';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Rejected;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.status = RequestStatus.Success;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  },
  selectors: {
    selectorOrders: (state: FeedState) => state.orders,
    selectorTotal: (state: FeedState) => state.total,
    selectorTotalToday: (state: FeedState) => state.totalToday
  }
});

export const { selectorOrders, selectorTotal, selectorTotalToday } =
  feedSlice.selectors;

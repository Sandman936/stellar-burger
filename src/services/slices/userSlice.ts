import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { checkUserAuth, loginUser, registerUser, updateUser } from '../thunks';

interface userState {
  isAuthChecked: boolean;
  user: TUser | null;
  status: RequestStatus;
  error: string | undefined;
}

export const initialState: userState = {
  isAuthChecked: false,
  user: null,
  status: RequestStatus.Idle,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearUserInfo: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = RequestStatus.Rejected;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.user = action.payload.user;
      });
  },
  selectors: {
    selectorIsUserChecked: (state: userState) => state.isAuthChecked,
    selectorUserData: (state: userState) => state.user
  }
});

export const userSelectors = userSlice.selectors;
export const userActions = userSlice.actions;

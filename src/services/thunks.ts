import {
  TLoginData,
  TRegisterData,
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../utils/cookie';
import { clearOrderData } from './slices/orderSlice';

export const fetchIngridents = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const checkUserAuth = createAsyncThunk('user/checkUser', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getFeeds = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getOrdersApi()
);

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[], { dispatch }) => {
    dispatch(clearOrderData());
    return orderBurgerApi(data);
  }
);

export const getOrder = createAsyncThunk(
  'order/get',
  async (number: number, { dispatch }) => {
    dispatch(clearOrderData());
    return getOrderByNumberApi(number);
  }
);

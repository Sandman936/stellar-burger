import { RequestStatus } from '@utils-types';
import { userActions, userSlice, initialState } from './userSlice';
import { checkUserAuth, loginUser, registerUser, updateUser } from '../thunks';
import { configureStore } from '@reduxjs/toolkit';

const expectedResult: typeof initialState = {
  isAuthChecked: true,
  user: {
    email: 'test@mail.ru',
    name: 'Владислав'
  },
  status: RequestStatus.Success,
  error: undefined
};

describe('Тест редьюсера слайса userSlice', () => {
  describe('Проверка экшенов аутентификации пользователя', () => {
    test('Проверка экшена ожидания аутентификации пользователя', () => {
      const state = userSlice.reducer(
        initialState,
        checkUserAuth.pending('user/checkUser')
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешной аутентификации пользователя', () => {
      const state = userSlice.reducer(
        initialState,
        checkUserAuth.fulfilled(
          { success: true, user: expectedResult.user! },
          'user/checkUser'
        )
      );

      expect(state).toEqual({ ...expectedResult, isAuthChecked: false });
    });
    test('Проверка экшена неудачной аутентификации пользователя', () => {
      const state = userSlice.reducer(
        initialState,
        checkUserAuth.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'user/checkUser'
        )
      );

      expect(state).toEqual({
        isAuthChecked: false,
        user: null,
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
  describe('Проверка экшенов регистрации нового пользователя', () => {
    test('Проверка экшена ожидания регистрации нового пользователя', () => {
      const state = userSlice.reducer(
        initialState,
        registerUser.pending('user/registerUser', {
          name: 'Владислав',
          email: 'test@mail.ru',
          password: '12345'
        })
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешной регистрации нового пользователя', () => {
      const state = userSlice.reducer(
        initialState,
        registerUser.fulfilled(
          {
            success: true,
            refreshToken: '123',
            accessToken: '345',
            user: expectedResult.user!
          },
          'user/registerUser',
          {
            name: 'Владислав',
            email: 'test@mail.ru',
            password: '12345'
          }
        )
      );

      expect(state).toEqual({ ...expectedResult, isAuthChecked: false });
    });
    test('Проверка экшена неудачной регистрации нового пользователя', () => {
      const state = userSlice.reducer(
        initialState,
        registerUser.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'user/registerUser',
          {
            name: 'Владислав',
            email: 'test@mail.ru',
            password: '12345'
          }
        )
      );

      expect(state).toEqual({
        isAuthChecked: false,
        user: null,
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
  describe('Проверка экшенов входа пользователя в профиль', () => {
    test('Проверка экшена ожидания входа пользователя в профиль', () => {
      const state = userSlice.reducer(
        initialState,
        loginUser.pending('user/loginUser', {
          email: 'test@mail.ru',
          password: '12345'
        })
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешного входа пользователя в профиль', () => {
      const state = userSlice.reducer(
        initialState,
        loginUser.fulfilled(
          {
            success: true,
            refreshToken: '123',
            accessToken: '345',
            user: expectedResult.user!
          },
          'user/loginUser',
          {
            email: 'test@mail.ru',
            password: '12345'
          }
        )
      );

      expect(state).toEqual({ ...expectedResult, isAuthChecked: false });
    });
    test('Проверка экшена неудачного входа пользователя в профиль', () => {
      const state = userSlice.reducer(
        initialState,
        loginUser.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'user/loginUser',
          {
            email: 'test@mail.ru',
            password: '12345'
          }
        )
      );

      expect(state).toEqual({
        isAuthChecked: false,
        user: null,
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
  describe('Проверка экшенов обновления информации о пользователе', () => {
    test('Проверка экшена ожидания обновления информации о пользователе', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.pending('user/loginUser', {
          name: 'Владислав',
          email: 'test@mail.ru',
          password: '12345'
        })
      );

      expect(state.status).toBe('Loading');
    });
    test('Проверка экшена успешного обновления информации о пользователе', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.fulfilled(
          {
            success: true,
            user: expectedResult.user!
          },
          'user/loginUser',
          {
            name: 'Владислав',
            email: 'test@mail.ru',
            password: '12345'
          }
        )
      );

      expect(state).toEqual({ ...expectedResult, isAuthChecked: false });
    });
    test('Проверка экшена неудачного обновления информации о пользователе', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.rejected(
          { message: 'Неизвестная ошибка', name: 'Ошибка' },
          'user/loginUser',
          {
            name: 'Владислав',
            email: 'test@mail.ru',
            password: '12345'
          }
        )
      );

      expect(state).toEqual({
        isAuthChecked: false,
        user: null,
        status: RequestStatus.Rejected,
        error: 'Неизвестная ошибка'
      });
    });
  });
  describe('Проверка экшенов для работы с данными пользователя', () => {
    test('Проверка экшена переключения флага аутентификации', () => {
      const userStore = configureStore({
        reducer: userSlice.reducer,
        preloadedState: initialState
      });

      userStore.dispatch(userActions.authChecked());

      expect(userStore.getState()).toEqual({
        ...initialState,
        isAuthChecked: true
      });
    });
    test('Проверка экшена очистки данных пользователя', () => {
      const userStore = configureStore({
        reducer: userSlice.reducer,
        preloadedState: initialState
      });

      userStore.dispatch(userActions.clearUserInfo());

      expect(userStore.getState()).toEqual({ ...initialState, user: null });
    });
  });
});

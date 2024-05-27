import { authApi } from '@/api/auth.api';
import { LoginResponse } from '@/api/axiosClient';
import { authActions } from '@/redux/authSlice';
import { history } from '@/utils/history';
import { PayloadAction } from '@reduxjs/toolkit';

import { call, fork, put, takeLatest } from 'redux-saga/effects';

export interface Account {
  email: string;
  password: string;
}

function* handleLogin(action: PayloadAction<Account>) {
  try {
    const res: LoginResponse = yield call(authApi.login, action.payload);
    localStorage.setItem('access', res.access);
    localStorage.setItem('refresh', res.refresh);
    yield put(authActions.loginSuccess(res));
    yield call(history.push, `/`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('🚀 ~ function*handleLogin ~ error:', error);
    yield put(authActions.loginFailed(error.message));
  }
}

function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, handleLogin);
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}

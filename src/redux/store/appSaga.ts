import { call, put } from '@redux-saga/core/effects';
import { takeLatest } from 'redux-saga/effects';

import { authApi } from '../../api/authApi';
import { UserInfo } from '../../models';
import { appAction } from './appSlice';
function* handleDisplayAPIWarning() {
  try {
    yield put(appAction.setAPIState(200));
  } catch (error) {}
}
export default function* appSaga() {
  yield takeLatest(appAction.setAPIState.type, handleDisplayAPIWarning);
}

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '@/redux/store/appSlice';
import { routerMiddleware } from 'react-router-redux';
import { history } from '@/utils/history';
import rootSaga from '@/redux/rootSaga';

const rootReducer = combineReducers({
  auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

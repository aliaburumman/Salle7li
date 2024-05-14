import {combineReducers, configureStore} from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import {persistReducer, persistStore} from 'redux-persist';
import notificationsReducer from './slices/notificationsSlice';
import {AuthApi} from '../data/auth/auth';
import {ProfileApi} from '../data/profile/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {userSlice} from './slices/slice';
import { HomeApi } from '../data/home/home';

const createDebugger = require('redux-flipper').default;

const reducers = combineReducers({
  user: userSlice.reducer,
  language: languageReducer,
  theme: themeReducer,
  read: notificationsReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [HomeApi.reducerPath]: HomeApi.reducer,
  [ProfileApi.reducerPath]: ProfileApi.reducer,
});

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const regist = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({
          serializableCheck: false,
        }).concat([AuthApi.middleware, ProfileApi.middleware,HomeApi.middleware, createDebugger()])
      : getDefaultMiddleware({
          serializableCheck: false,
        }).concat([AuthApi.middleware, ProfileApi.middleware,HomeApi.middleware]),
});

export default regist;

export const persistor = persistStore(regist);
export type RootState = ReturnType<typeof regist.getState>;
export type AppDispatch = typeof regist.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

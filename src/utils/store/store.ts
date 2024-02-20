import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeSlice from './features/themeSlice';
import userSlice from './features/userSlice';

const userPersistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['token'],
};
const themePersistConfig = {
    key: 'theme',
    storage: storage,
    whitelist: ['mode'],
};

const rootReducer = combineReducers({
    theme: persistReducer(themePersistConfig, themeSlice),
    user: persistReducer(userPersistConfig, userSlice),
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

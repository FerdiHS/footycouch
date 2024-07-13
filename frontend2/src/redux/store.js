import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import playerReducer from './players/players.js';
import userReducer from './user/user.js';
import messageReducer from './messages/message.js';
import shareReducer from './shares/shares.js';

const rootReducer = combineReducers({
  players: playerReducer,
  user: userReducer,
  message: messageReducer,
  shares: shareReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
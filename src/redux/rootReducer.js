import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import dashboardReducer from './slices/dashboard';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});

export { rootPersistConfig, rootReducer };

import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import appGlobalReducer from './reducers/appGlobalReducer';
import {api} from './services/query';

const store = configureStore({
  reducer: {
    globals: appGlobalReducer,
    [api.reducerPath]: api.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

//enable refetchOnMount, refetchOnReconnect
setupListeners(store.dispatch);
export default store;

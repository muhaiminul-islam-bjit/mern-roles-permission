import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import conversationsSliceReducer from "../features/conversations/conversationsSlice";
import messagesSliceReducer from "../features/messages/messagesSlice";
import rolesSliceReducer from "../features/roles/rolesSlice";
import storeSliceReducer from "../features/store/storeSlice";
import usersSliceReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    conversations: conversationsSliceReducer,
    messages: messagesSliceReducer,
    users: usersSliceReducer,
    roles: rolesSliceReducer,
    stores: storeSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});

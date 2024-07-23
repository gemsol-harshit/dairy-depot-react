import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./reducers/agentReducer";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  agentList: agentReducer,
  // Add other reducers here if needed
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";

const appReducer = combineReducers({
  user
});

const rootReducer = (state, action) => {
  if (action.type === "REMOVE_USER") {
    state = undefined;
  }
  return appReducer(state, action);
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export const store = createStore(rootReducer, middleware);

export default store;
export * from './user';

import { createStore, applyMiddleware } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import {composeWithDevTools} from "redux-devtools-extension";
import axios from "axios";
import reducer from "./index";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

const axiosOptions = {
  onSuccess: ({ action, next, response, dispatch }) => {
    next({
      type: `${action.type}_SUCCESS`,
      payload: response,
    });
  },
  onError: ({ action, next, error, dispatch }) => {
    next({
      type: `${action.type}_FAIL`,
      payload: error,
    });
  },
};

const middleware = applyMiddleware(
  axiosMiddleware(client, axiosOptions),
);

const store = function configureStore(initialState) {
  return createStore(reducer, initialState, composeWithDevTools(middleware));
};

export default store;

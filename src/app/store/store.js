import { createStore, applyMiddleware } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import {composeWithDevTools} from "redux-devtools-extension";
import { logger } from "redux-logger/src";
import axios from "axios";
import reducer from "./index";
import {axiosOptions} from "../utils/helpers/axiosOptions";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});



const middleware = applyMiddleware(
  axiosMiddleware(client, axiosOptions),
  logger,
);

const store = function configureStore(initialState) {
  return createStore(reducer, initialState, composeWithDevTools(middleware));
};

export default store;

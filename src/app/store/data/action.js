import { createActions } from "redux-actions";
import {types} from "./types";

export const {
  changeCurrencyInput
} = createActions(
  types.CHANGE_CURRENCY_INPUT
);

import { createActions } from "redux-actions";
import {types} from "./types";

export const {changeBaseCurrency} = createActions(types.CHANGE_BASE_CURRENCY);

import { handleActions } from "redux-actions";
import {types} from "./types";
import {mergeIn} from "../../utils/helpers/stateHelpers";
import {fieldNames} from "../../constants/fieldNames";

const initialState = {
  base: 'UAH',
  rates: null,
  date: null,
  currencyInput: {
    [fieldNames.yours]: 1,
    [fieldNames.theirs]: 1,
  }
};

const reducer = handleActions(
  {
    [types.GET_RATES_SUCCESS]: mergeIn(({ payload: { base, rates, date } }) => ({
      base,
      rates,
      date
    })),
    [types.CHANGE_CURRENCY_INPUT]: mergeIn(({ payload: {name, value} }) => ({ [name]: +value }))
  },
  initialState
);

export default reducer;

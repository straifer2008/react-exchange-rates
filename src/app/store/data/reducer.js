import { handleActions } from "redux-actions";
import {types} from "./types";
import {mergeIn} from "../../utils/helpers/stateHelpers";

const initialState = {
  base: {value: 1, label: 'UAH'},
  rates: null,
  date: null,
};

const reducer = handleActions(
  {
    [types.GET_RATES_SUCCESS]: mergeIn(({ payload: { base, rates, date } }) => ({
      base,
      rates,
      date
    })),
  },
  initialState
);

export default reducer;

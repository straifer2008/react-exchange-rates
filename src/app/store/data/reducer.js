import { handleActions } from "redux-actions";
import {types} from "./types";
import {mergeIn} from "../../utils/helpers/stateHelpers";

const initialState = {
  base: 'UAH',
  rates: null,
  date: null,
};

const reducer = handleActions(
  {
    [types.GET_RATES_SUCCESS]: mergeIn(({ payload: { data } }) => ({
      base: data.base,
      rates: data.rates,
      date: data.date
    })),
    [types.CHANGE_BASE_CURRENCY]: mergeIn(({ payload }) => ({ base: payload }))
  },
  initialState
);

export default reducer;

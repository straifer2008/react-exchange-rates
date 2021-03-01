import {types} from "../../store/data/types";
import {formatRates} from "./formatRates";

export const axiosOptions = {
  onSuccess: ({ action, next, response, dispatch }) => {
    if (action.type === types.GET_RATES) {
      next({
        type: `${action.type}_SUCCESS`,
        payload: {
          rates: formatRates(response.data.rates),
          date: response.data.date,
          base: response.data.base
        },
      });
    } else {
      next({
        type: `${action.type}_SUCCESS`,
        payload: response,
      });
    }
  },
  onError: ({ action, next, error, dispatch }) => {
    next({
      type: `${action.type}_FAIL`,
      payload: error,
    });
  },
};

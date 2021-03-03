import {types} from "../../store/data/types";
import {getFormatRatesAndBase} from "./formatRates";

export const axiosOptions = {
  onSuccess: ({ action, next, response, dispatch }) => {
    switch (action.type) {
      case types.GET_RATES: {
        const {base, rates} = getFormatRatesAndBase(response.data);
        next({
          type: `${action.type}_SUCCESS`,
          payload: {
            date: response.data.date,
            rates,
            base
          },
        });
        break;
      }
      case types.GET_CURRENCY_RATE: {
        const {base, rates} = getFormatRatesAndBase(response.data);
        next({
          type: `${action.type}_SUCCESS`,
          payload: {
            date: response.data.date,
            rates,
            base
          },
        });
        break;
      }
      default:
        next({
          type: `${action.type}_SUCCESS`,
          payload: response,
        });
        break;
    }
  },
  onError: ({ action, next, error, dispatch }) => {
    next({
      type: `${action.type}_FAIL`,
      payload: error,
    });
  },
};

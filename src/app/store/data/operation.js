import {types} from "./types";

const getRates = (baseCurrency = 'uah') => ({
  type: types.GET_RATES,
  payload: {
    request: {
      url: '/latest',
      method: "GET",
      params: {
        base: baseCurrency.toUpperCase()
      }
    },
  },
});

export { getRates };

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

const getConverterRate = (fromCurrency, toCurrency) => ({
  type: types.GET_CURRENCY_RATE,
  payload: {
    request: {
      url: '/latest',
      method: "GET",
      params: {
        base: fromCurrency.toUpperCase(),
        symbols: toCurrency.toUpperCase()
      }
    },
  },
})

export { getRates, getConverterRate };

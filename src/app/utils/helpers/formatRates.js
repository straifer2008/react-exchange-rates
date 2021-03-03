export const formatRates = (options) => Object.keys(options).map((key, i) => ({
  label: key,
  value: Math.round((options[key] + Number.EPSILON) * 1000) / 1000,
  index: i
}));

export const getBaseCurrency = ({base, rates}) => formatRates(rates).find(option => option.label === base)

export const getFormatRatesAndBase = ({base, rates}) => {
  const formattedRates = formatRates(rates);
  const formattedBase = formattedRates.find(option => option.label === base) || { value: 1, label: base };

  return {
    rates: formattedRates,
    base: formattedBase,
  }
}

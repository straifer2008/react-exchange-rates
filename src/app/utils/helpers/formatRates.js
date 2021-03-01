export const formatRates = (options) => Object.keys(options).map((key, i) => ({
  label: key,
  value: Math.round((options[key] + Number.EPSILON) * 1000) / 1000,
  index: i
}));

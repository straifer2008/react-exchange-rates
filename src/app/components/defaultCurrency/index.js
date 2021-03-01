import {useEffect, useState} from 'react';
import Select from 'react-select'
import {useDispatch, useSelector} from "react-redux";
import {changeBaseCurrency} from "../../store/data/action";
import './styles.scss';

const DefaultCurrency = () => {
  const {rates, base} = useSelector(({ data }) => ({
    rates: data.rates,
    base: data.base
  }));
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch()

  const currencySearch = (options) => {
    if (rates) {
      const newOptions = Object.keys(options).map((key, i) => ({
        label: key,
        value: options[key],
        index: i
      }));

      setOptions(newOptions);
    }
  }

  const onChangeHandler = ({ label }) => {
    dispatch(changeBaseCurrency(label))
  }

  useEffect(() => {
    currencySearch(rates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates])

  if (!options.length) return <p>loading...</p>

  return (
    <div className="DefaultCurrency">
      <p>Default currency</p>
      <Select
        className="DefaultCurrency_select"
        defaultValue={{label: base, value: rates[base]}}
        options={options}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default DefaultCurrency;

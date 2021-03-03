import Select from 'react-select'
import {useDispatch, useSelector} from "react-redux";
import {dataOperation} from "../../store/data";
import './styles.scss';

const DefaultCurrency = ({ onChange }) => {
  const {options, base} = useSelector(({ data }) => ({
    options: data.rates,
    base: data.base
  }));
  const dispatch = useDispatch()

  const onChangeHandler = (item) => {
    if (onChange && typeof onChange === "function" ) {
      onChange(item);
    }

    dispatch(dataOperation.getRates(item.label));
  }

  if (!options || !options.length) return <p>loading...</p>

  return (
    <div className="DefaultCurrency">
      <small>Default currency</small>
      <Select
        value={options.filter(option => option.label === base.label)}
        className="DefaultCurrency_select"
        defaultValue={base}
        options={options}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default DefaultCurrency;

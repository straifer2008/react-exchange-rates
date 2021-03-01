import {useState} from 'react';
import Select from "react-select";
import './styles.scss';

const ConverterRow = ({ options, name, onChangeCurrency, onChangeValue, defValue }) => {
  const [inputValue, setInputValue] = useState(defValue[name].value);

  const onChangeCurrencyHandler = (option) => {
    onChangeCurrency(option, name);
  }

  const onChangeInputHandler = ({target: { value }}) => {
    setInputValue(value);
    onChangeValue(value, name);
  }

  return (
    <div className="ConverterRow">
      <input
        type="number"
        className="def-input"
        placeholder="Enter value"
        value={inputValue}
        onChange={onChangeInputHandler}
      />
      <Select
        className="def-select"
        options={options}
        onChange={onChangeCurrencyHandler}
        defaultValue={defValue[name]}
      />
    </div>
  );
};

export default ConverterRow;

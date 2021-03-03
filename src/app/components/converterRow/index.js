import Select from "react-select";
import './styles.scss';

const ConverterRow = ({ options, name, onChangeCurrency, onChangeValue, defValue, calcValue }) => {

  const onChangeCurrencyHandler = (option) => {
    onChangeCurrency(option, name);
  }

  const onChangeInputHandler = ({target: { value }}) => {
    onChangeValue(+value, name);
  }

  return (
    <div className="ConverterRow">
      <input
        type="number"
        step="any"
        className="def-input"
        placeholder="Enter value"
        value={calcValue}
        onChange={onChangeInputHandler}
      />
      <Select
        className="def-select"
        options={options}
        onChange={onChangeCurrencyHandler}
        defaultValue={defValue}
      />
    </div>
  );
};

export default ConverterRow;

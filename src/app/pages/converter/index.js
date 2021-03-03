import {useState} from 'react';
import {ContentContainer} from "../../containers";
import {ConverterRow} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fieldNames} from "../../constants/fieldNames";
import './styles.scss';
import {dataOperation} from "../../store/data";


const ConverterPage = () => {
  const dispatch = useDispatch();
  const {options, base} = useSelector(({data: {rates, base}}) => ({
    options: rates, base
  }));
  const [defaultValues, setDefaultValues] = useState({
    [fieldNames.yours]: base,
    [fieldNames.theirs]: options.find(option => option.label === (base.label === 'USD' ? 'UAH': base.label))
  })
  const [currencyValues, setCurrencyValues] = useState({
    [fieldNames.yours]: base.value,
    [fieldNames.theirs]: options.find(option => option.label === (base.label === 'USD' ? 'UAH': base.label)).value,
  })

  const onChangeValueHandler = (value, name, resetValues) => {
    switch (name) {
      case fieldNames.yours: {
        setCurrencyValues({
          [fieldNames.yours]: value,
          [fieldNames.theirs]: Math
            .round((defaultValues[fieldNames.theirs].value * value + Number.EPSILON) * 1000) / 1000 || 0
        });
        break;
      }
      case fieldNames.theirs: {
        setCurrencyValues({
          [fieldNames.yours]: resetValues || Math
            .round((value / defaultValues[fieldNames.theirs].value + Number.EPSILON) * 1000) / 1000 || 0,
          [fieldNames.theirs]: value,
        });
        break;
      }
      default: break;
    }
  }

  const onChangeCurrencyHandler = (option, name) => {
    console.log(option, name, 'onChangeCurrencyHandler');
    switch (name) {
      case fieldNames.yours: {
        dispatch(dataOperation.getConverterRate(option.label, defaultValues[fieldNames.theirs].label))
        break;
      }
      case fieldNames.theirs: {
        setDefaultValues({
          ...defaultValues,
          [fieldNames.theirs]: option
        })
        onChangeValueHandler(option.value, fieldNames.theirs, 1);
        break;
      }
      default: break;
    }
  }

  return (
    <div className="ConverterPage">
      <div className="ConverterPage_title m-b-30">
        <h1>Converter</h1>
      </div>

      <ContentContainer className="ConverterPage_wrap">
       <ConverterRow
         name={fieldNames.yours}
         options={options}
         onChangeCurrency={onChangeCurrencyHandler}
         onChangeValue={onChangeValueHandler}
         defValue={defaultValues[fieldNames.yours]}
         calcValue={currencyValues[fieldNames.yours]}
       />

       <ConverterRow
         name={fieldNames.theirs}
         options={options}
         onChangeCurrency={onChangeCurrencyHandler}
         onChangeValue={onChangeValueHandler}
         defValue={defaultValues[fieldNames.theirs]}
         calcValue={currencyValues[fieldNames.theirs]}
       />
      </ContentContainer>
    </div>
  );
};

export default ConverterPage;

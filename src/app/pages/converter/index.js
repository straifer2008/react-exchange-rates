import {useState, useEffect} from 'react';
import {ContentContainer} from "../../containers";
import {ConverterRow} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fieldNames} from "../../constants/fieldNames";
import {dataOperation} from "../../store/data";
import {useStateCallback} from "../../utils/helpers/hooks";
import './styles.scss';


const ConverterPage = () => {
  const dispatch = useDispatch();
  const {options, base} = useSelector(({data: {rates, base}}) => ({
    options: rates, base
  }));
  const [defaultValues, setDefaultValues] = useStateCallback({
    [fieldNames.yours]: base,
    [fieldNames.theirs]: options.find(option => option.label === (base.label === 'USD' ? 'UAH': 'USD'))
  })
  const [currencyValues, setCurrencyValues] = useState({
    [fieldNames.yours]: base.value,
    [fieldNames.theirs]: options.find(option => option.label === (base.label === 'USD' ? 'UAH': 'USD')).value,
  })

  const onChangeValueHandler = (value, name, resetValues, defValues) => {
    const defaultData = defValues && defValues[fieldNames.theirs] && defValues[fieldNames.yours] ?
      defValues : defaultValues;

    switch (name) {
      case fieldNames.yours: {
        setCurrencyValues({
          [fieldNames.yours]: value,
          [fieldNames.theirs]: Math
            .round((defaultData[fieldNames.theirs].value * value + Number.EPSILON) * 1000) / 1000 || 0
        });
        break;
      }
      case fieldNames.theirs: {
        setCurrencyValues({
          [fieldNames.yours]: resetValues || Math
            .round((value / defaultData[fieldNames.theirs].value + Number.EPSILON) * 1000) / 1000 || 0,
          [fieldNames.theirs]: value,
        });
        break;
      }
      default: break;
    }
  }

  const onChangeCurrencyHandler = (option, name) => {
    switch (name) {
      case fieldNames.yours: {
        dispatch(dataOperation.getRates(option.label));
        break;
      }
      case fieldNames.theirs: {
        setDefaultValues({
          ...defaultValues,
          [fieldNames.theirs]: option
        });
        onChangeValueHandler(option.value, fieldNames.theirs, 1);
        break;
      }
      default: break;
    }
  }

  useEffect(() => {
    if (base) {
      setDefaultValues({
        [fieldNames.yours]: base,
        [fieldNames.theirs]: options
          .find(option => option.label === defaultValues[fieldNames.theirs].label)
      }, (data) => {
        onChangeValueHandler(base.value, fieldNames.yours, 1, data)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base])

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

import {useState} from 'react';
import {ContentContainer} from "../../containers";
import {ConverterRow} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {debounce} from "lodash";
import {dataAction} from "../../store/data";
import {fieldNames} from "../../constants/fieldNames";
import './styles.scss';


const ConverterPage = () => {
  console.log('ConverterPage');

  const dispatch = useDispatch();
  const {options, baseCurrency} = useSelector(({data: {rates, base}}) => ({
    options: rates,
    baseCurrency: base
  }));
  const [defaultValues] = useState({
    [fieldNames.yours]: {value: 1, label: baseCurrency},
    [fieldNames.theirs]: options[0]
  })

  const onChangeCurrencyHandler = (option, name) => {
    console.log(option, name)
  }
  const onChangeValueHandler = debounce((value, name) => {
    console.log({name, value})
    dispatch(dataAction.changeCurrencyInput({name, value}))
  }, 300)

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
         defValue={defaultValues}
       />

       <ConverterRow
         name={fieldNames.theirs}
         options={options}
         onChangeCurrency={onChangeCurrencyHandler}
         onChangeValue={onChangeValueHandler}
         defValue={defaultValues}
       />
      </ContentContainer>
    </div>
  );
};

export default ConverterPage;

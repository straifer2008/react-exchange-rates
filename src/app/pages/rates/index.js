import {useState} from 'react';
import {useSelector} from "react-redux";
import {Loader} from "../../components";
import './styles.scss';

const RatesPage = () => {
  const [searchStr, setSearchStr] = useState('');
  const {rates, base} = useSelector(({data}) => ({
    rates: data.rates,
    base: data.base
  }))

  const searchHandler = ({ target }) => {
    setSearchStr(target.value);
  }

  if (!rates) return <Loader />;

  return (
    <div className="RatesPage">
      <div className="RatesPage_title m-b-20">
        <h1 className="m-r-100">Rates for <strong>{base}</strong> currency</h1>
        <input
          className="def-input"
          type="search"
          onChange={searchHandler}
          placeholder="Search Currency"
        />
      </div>
      <ul className="RatesPage_list">
        {
          rates
            .filter((rate) => rate.label.includes(searchStr.toUpperCase()))
            .map((rate) => {
              if (rate.label === base) {
                return null
              }

              return (
                <li key={`oneRate-${rate.label}`} className="RatesPage_list__item">
                  <span>{rate.value}</span><span>{rate.label}</span>
                </li>
              );
            })
        }
      </ul>
    </div>
  );
};

export default RatesPage;

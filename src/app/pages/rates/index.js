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
          Object.keys(rates)
            .filter((rate) => rate.includes(searchStr.toUpperCase()))
            .map(key => {
              if (key === base) {
                return null
              }

              return (
                <li key={`oneRate-${key}`} className="RatesPage_list__item">
                  <span>{rates[key]}</span><span>{key}</span>
                </li>
              );
            })
        }
      </ul>
    </div>
  );
};

export default RatesPage;

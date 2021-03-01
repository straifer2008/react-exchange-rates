import {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Page404} from "../pages";
import {lazyRoutes} from "../constants/lazyRoutes";
import {dataOperation} from "../store/data";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(({ data: { base }}) => base);
  const rates = useSelector(({data: { rates }}) => rates);

  useEffect(() => {
    if (!rates || !rates.length) {
      dispatch(dataOperation.getRates(baseCurrency));
    }
  })

  if (!rates || !rates.length) return <p>No currencies</p>

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        {lazyRoutes.map((route) =>
          <Route
            key={`route-link-${route.link.trim()}`}
            component={route.component}
            path={route.link}
            exact
          />
        )}

        <Redirect exact to='/converter' from="/" />
        <Route component={Page404} />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;

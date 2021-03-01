import React from 'react';
import {NavLink} from "react-router-dom";
import {lazyRoutes} from "../../constants/lazyRoutes";
import {DefaultCurrency} from "../../components";
import './styles.scss';

const Header = () => {
  return (
    <header className="header">
      <nav className="header_nav">
        {lazyRoutes.map((route) =>
          <NavLink
            className="header_nav__link"
            key={`navLink${route.link.trim()}`}
            to={route.link}>
            {route.title}
          </NavLink>
        )}
      </nav>

      <DefaultCurrency />
    </header>
  );
};

export default Header;

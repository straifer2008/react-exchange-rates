import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Loader = ({ secondary }) => {
  return secondary ? (
    <div className="loader__secondary" />
  ) : (
    <div className="loader">
      <div className="ball-loader">
        <div className="ball-loader-ball ball1" />
        <div className="ball-loader-ball ball2" />
        <div className="ball-loader-ball ball3" />
      </div>
    </div>
  );
};

Loader.propTypes = {
  secondary: PropTypes.bool,
};

Loader.defaultProps = {
  secondary: false,
};

export default Loader;

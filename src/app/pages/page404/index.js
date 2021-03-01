import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Page404 = ({ history: { goBack } }) => (
  <div className="page404">
    <h1>404</h1>
    <h4>Page not found</h4>
    <p className="m-b-30">Please try again later</p>
    <button className="btn" onClick={goBack}>
      Go back
    </button>
  </div>
);

Page404.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default Page404;

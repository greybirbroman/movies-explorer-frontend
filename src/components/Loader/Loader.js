import React from "react";
import "./Loader.css";

const Loader = (props) => {
  return (
    <>
      <div className={`${props.isLoading ? "loader" : null}`}></div>
    </>
  );
};

export default Loader;

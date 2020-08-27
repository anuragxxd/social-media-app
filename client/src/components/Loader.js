import React from "react";

const Spinner = (props) => {
  return (
    <div className="ui segment" style={{ height: "100vh" }}>
      <div class="ui active inverted dimmer">
        <div className="ui large text loader">{props.message}</div>
      </div>
      <p></p>
    </div>
  );
};

Spinner.defaultProps = {
  message: "",
};

export default Spinner;

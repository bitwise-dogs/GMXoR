import React from "react";

const Order = (props) => {
  let index = props.index;
  let element = props.element;

  return <li key={index}>{element[0] + ". order type - " + element[1]}</li>;
};

export default Order;

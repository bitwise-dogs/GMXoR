import React from "react";

const Order = (props) => {
  let index = props.index;
  let element = props.element;

  return (
    <tr key={index}>
      <td>{element[0]}</td>
      <td>{element[1]}</td>
      <td>{element[2]}</td>
    </tr>
  );
};

export default Order;

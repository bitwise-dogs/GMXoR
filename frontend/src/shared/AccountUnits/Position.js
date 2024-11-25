import React from "react";

const Position = (props) => {
  let index = props.index;
  let element = props.element;

  return <tr key={index}>
      <td>{element[1]}</td>
      <td>{element[0]}</td>
    </tr>;
};

export default Position;

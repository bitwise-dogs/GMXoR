import React from "react";

const Position = (props) => {
  let index = props.index;
  let element = props.element;

  return (
    <tr key={index}>
      <td><b>{element[2]}</b> / {element[1]} <p className="leverage">{element[6]}</p></td>
      <td>{element[0]}</td>
      <td>{element[3]}</td>
      <td>{element[4]}</td>
      <td>{element[5]}</td>
    </tr>
  );
};

export default Position;

import React from "react";

const Position = (props) => {
  let index = props.index;
  let element = props.element;

  return (
    <li key={index}>
      {element[1] + " position - " + element[0] + " " + element[2]}
    </li>
  );
};

export default Position;

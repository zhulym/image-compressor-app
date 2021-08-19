// libraries
import React from 'react';
// static
// styles
import './Option.css';

const Option = (props) => {
  return (
    <div className="options-item">
      <label className="image-label" htmlFor={props.htmlFor}>{props.label}</label>
      <input
        id={props.id}
        className={props.className}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Option;
import React from "react";

export default (props) => {
  const { labelBefore, labelAfter } = props;

  const handleChange = () => {
    props.handleChange(!props.checked);
  };
  return (
    <label
      style={{
        margin: "7px auto",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
      className="switch-wrapper"
    >
      {labelBefore && <span>{labelBefore}</span>}
      <div className="switch">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </div>{" "}
      {labelAfter && <span>{labelAfter}</span>}
    </label>
  );
};

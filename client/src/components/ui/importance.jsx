import React from "react";

const Importance = ({ _id, color, name }) => {
  return (
    <span className={" badge bg-" + color} key={_id}>
      {name}
    </span>
  );
};

export default Importance;

import React from "react";

const Category = (props) => {
  return (
    <button
      className="category"
      id={props.category.id}
      onClick={props.getCategory}
      value={props.category.name}
    >
      {props.category.name}
    </button>
  );
};

export default Category;

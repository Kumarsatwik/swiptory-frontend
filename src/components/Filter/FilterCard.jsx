import React, { useState } from "react";
import "../styles/category.css";

import categoryData from "../../constantData/CategoryList";

const FilterCard = ({ selectedCategory, setSelectedCategory }) => {
  // const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="category">
      {categoryData.map((item, index) => (
        <span
          key={index}
          className={selectedCategory == item.name ? "selected" : ""}
          onClick={() => handleCategoryClick(item.name)}
        >
          <img src={item.image} alt="" />
          <label htmlFor="">{item.name}</label>
        </span>
      ))}
    </div>
  );
};

export default FilterCard;

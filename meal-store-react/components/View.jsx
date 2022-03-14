import React from "react";
import Category from "./Category.jsx";
import Product from "./Product.jsx";
import { categories, products } from "../data";

function filterContent(contents, filterCriteria) {
  if (filterCriteria) {
    const filteredItems = contents.filter((content) => {
      return content.category === filterCriteria;
    });
    return filteredItems;
  }
  return contents;
}

const View = () => {
  const [currentCategory, setCurrentCategory] = React.useState(false);

  const getCategory = (event) => {
    if (event.target.classList.contains("category")) {
      const { value } = event.target;
      setCurrentCategory(value);
    }
  };

  const categoriesContainer = categories.map((category) => {
    return (
      <Category
        key={category.id}
        category={category}
        getCategory={getCategory}
      />
    );
  });

  const productsContainer = filterContent(products, currentCategory).map(
    (product, i) => {
      return <Product key={i} product={product} isAnimate={currentCategory} />;
    }
  );

  return (
    <React.Fragment>
      <div className="categories">
        <nav id="itemCategories">
          <button id="cat-all" className="category" onClick={getCategory}>
            All
          </button>
          {categoriesContainer}
        </nav>
      </div>
      <div
        id="shopItems"
        className={`shop-items ${currentCategory && "reverse-shop-items"}`}
      >
        {productsContainer}
      </div>
    </React.Fragment>
  );
};

export default View;

const categories = [
  {
    id: "cat-1",
    name: "food",
  },
  {
    id: "cat-2",
    name: "fruits",
  },
  { id: "cat-3", name: "drinks" },
];

const products = [
  {
    emoji: "🍇",
    name: "Grape",
    price: 7,
    category: "fruits",
    additional: [
      {
        content: "A grape bunch, as cut from the vine and used to make wine",
      },
    ],
  },
  {
    emoji: "🍦",
    name: "ice cream",
    price: 5,
    category: "drinks",
    additional: [
      {
        content:
          "A swirl of soft-serve ice cream atop a wafer-style cone, white or cream-colored, as vanilla, on most platforms",
      },
    ],
  },
  {
    emoji: "🍊",
    name: "Tangerine",
    price: 6,
    category: "fruits",
    additional: [
      {
        content:
          "An orange-colored citrus fruit with a green leaf or leaves and stem",
      },
    ],
  },
  {
    emoji: "🍔",
    name: "Hamburger",
    price: 10,
    category: "food",
    additional: [
      {
        content:
          "A burger with a beef patty, usually depicted on a sesame bun with cheese, lettuce, and tomato",
      },
    ],
  },
  {
    emoji: "🍩",
    name: "donuts",
    price: 7,
    category: "food",
    additional: [
      {
        content:
          "A chocolate-glazed donut (or doughnut) with rainbow sprinkles",
      },
    ],
  },
  {
    emoji: "🍺",
    name: "Root Beer",
    price: 20,
    category: "drinks",
    additional: [
      { content: "A beer, as a golden-colored lager, in a frosty mug" },
    ],
  },
  {
    emoji: "🍕",
    name: "Pizza",
    price: 12,
    category: "food",
    additional: [
      { content: "A slice of pepperoni pizza, topped with black olives" },
    ],
  },
  {
    emoji: "🍉",
    name: "watermelon",
    price: 8,
    category: "fruits",
    additional: [
      {
        content:
          "A slice of watermelon, showing its rich pink flesh, black seeds, and green rind",
      },
    ],
  },
  {
    emoji: "🥤",
    name: "Water",
    calories: 0,
    price: 3,
    category: "drink",
    additional: [{ content: "A drinking cup with a straw" }],
  },
  {
    emoji: "🍹",
    name: "Tropical Drink",
    calories: 180,
    price: 25,
    category: "drink",
    additional: [
      {
        content: "A sunset-orange-colored tropical beverage in a stemmed glass",
      },
    ],
  },
  {
    emoji: "🍖",
    name: "Barbecue",
    calories: 120,
    price: 15,
    category: "food",
    additional: [{ content: "A hunk of unspecified meat on a white bone" }],
  },
  {
    emoji: "🍓",
    name: "Strawberry",
    price: 12,
    category: "fruits",
    additional: [
      {
        content:
          "The fruit of a rich red strawberry dotted with seeds and crowned with green leaves",
      },
    ],
  },
];

const view = {
  shopItems: document.getElementById("shopItems"),
  products: document.getElementsByClassName("product"),
  itemCategories: document.getElementById("itemCategories"),

  createElement(tag, attributes, content) {
    const element = document.createElement(tag);
    for (let att in attributes) {
      element.setAttribute(att, attributes[att]);
    }
    element.textContent = content;
    return element;
  },
};

const mealStore = {
  products: [],

  showCategories(categories) {
    const categoriesContainer = categories.map((category) => {
      const categoryButton = view.createElement(
        "button",
        {
          id: category.id,
          class: "category",
          value: category.name,
        },
        category.name
      );
      return categoryButton;
    });
    categoriesContainer.forEach((category) =>
      view.itemCategories.appendChild(category)
    );
  },

  showProducts(products, filter) {
    this.products = this.filterContent(products, filter);
    const productsContainer = this.products.map((product, index) => {
      const productContainer = view.createElement(
        "div",
        { class: "product", "data-product-id": `${product.name}${index}` },
        null
      );
      const imageContainer = view.createElement(
        "div",
        { class: "product-img" },
        null
      );
      const image = view.createElement(
        "span",
        {
          role: "img",
          "aria-label": product.name,
          "data-icon": "product-image",
          "data-index": `${index}`,
        },
        product.emoji
      );
      const productContent = view.createElement(
        "div",
        { class: "product-content" },
        null
      );
      const productName = view.createElement(
        "span",
        { class: "product-name" },
        product.name
      );
      const productPrice = view.createElement(
        "span",
        { class: "product-price" },
        `$${(Math.round(product.price * 100) / 100).toFixed(2)}`
      );
      const addButton = view.createElement(
        "button",
        {
          id: `${product.name}${index}`,
          class: "add",
          value: JSON.stringify(product),
          "data-action": "add",
        },
        "Add to Cart"
      );
      imageContainer.appendChild(image);
      productContent.appendChild(productName);
      productContent.appendChild(productPrice);
      productContent.appendChild(addButton);
      productContainer.appendChild(imageContainer);
      productContainer.appendChild(productContent);
      return productContainer;
    });
    productsContainer.forEach((product) => {
      view.shopItems.appendChild(product);
    });
  },

  filterContent(contents, filterCriteria) {
    if (filterCriteria) {
      const filteredItems = contents.filter((content) => {
        return content.category === filterCriteria;
      });
      return filteredItems;
    }
    return contents;
  },

  watchMealStore() {
    view.itemCategories.addEventListener("click", (event) => {
      if (event.target.classList.contains("category")) {
        const { value } = event.target;
        view.shopItems.innerHTML = "";
        this.showProducts(products, value);
        //animate filtered products
        view.shopItems.classList.toggle("reverse-shop-items");
        [...view.products].forEach((product) => {
          product.classList.add("sort-product");
          product.addEventListener("animationend", function () {
            product.classList.remove("sort-product");
          });
        });
      }
    });
  },
};

window.addEventListener("DOMContentLoaded", () => {
  mealStore.showCategories(categories);
  mealStore.showProducts(products, false);
});

window.addEventListener("load", () => {
  mealStore.watchMealStore();
});

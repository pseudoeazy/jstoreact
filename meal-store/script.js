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
    calories: 170,
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
    calories: 120,
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
    calories: 160,
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
    calories: 200,
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
    calories: 120,
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
    calories: 214,
    price: 20,
    category: "drinks",
    additional: [
      { content: "A beer, as a golden-colored lager, in a frosty mug" },
    ],
  },
  {
    emoji: "🍕",
    name: "Pizza",
    calories: 120,
    price: 12,
    category: "food",
    additional: [
      { content: "A slice of pepperoni pizza, topped with black olives" },
    ],
  },
  {
    emoji: "🍉",
    name: "watermelon",
    calories: 120,
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
    calories: 180,
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
  totalItems: document.getElementById("totalItems"),
  shopItems: document.getElementById("shopItems"),
  products: document.getElementsByClassName("product"),
  itemCategories: document.getElementById("itemCategories"),
  cartSummary: document.getElementById("cartSummary"),
  hideSummary: document.getElementById("hideSummary"),
  summaryTotalItems: document.getElementById("summaryTotalItems"),
  summaryContainer: document.getElementById("summaryContainer"),
  footerYear: document.getElementById("footerYear"),
  modalContainer: document.getElementsByClassName("modal-container")[0],
  closeButton: document.getElementsByClassName("close-button")[0],
  modalInfo: document.getElementById("modalInfo"),
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
  filterContent(contents, filterCriteria) {
     if (filterCriteria) {
      const filteredItems = contents.filter((content) => {
        return content.category === filterCriteria;
      });
      return filteredItems;
    }
    return contents;
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
  showModalBox(index) {
    const selectedProduct = this.products[index];
    const modalProduct = [selectedProduct].map((product) => {
      const content = `<div class="store-image">${product.emoji}</div>
      <table class="store-info">
        <tr>
          <td class="title">Name</td>
          <td class="info">${product.name}</td>
        </tr>
        <tr>
          <td class="title">Calories</td>
          <td class="info">${product.calories}</td>
        </tr>
        <tr>
          <td class="title">Price</td>
          <td class="info">$${product.price}.00</td>
        </tr>
        <tr>
          <td class="title">Category</td>
          <td class="info">${product.category}</td>
        </tr>
        <tr>
          <td class="title">Description</td>
          <td class="info">${
            product.additional.map((info) => info.content)[0]
          }</td>
        </tr>
      </table>`;
      return content;
    });
    view.modalInfo.innerHTML = modalProduct[0].replace(/>,/gi, ">");
  },
  watchMealStore() {
    view.itemCategories.addEventListener("click", (event) => {
      if (event.target.classList.contains("category")) {
        const { value } = event.target;
        view.shopItems.innerHTML = "";
        this.showProducts(
          products,
          value 
        );
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
    view.shopItems.addEventListener("click", (event) => {
      if (event.target.classList.contains("add")) {
        const { id, value } = event.target;
        const { action } = event.target.dataset;
        cart.addToCart(id, value, action);
      }
      if (event.target.dataset.icon === "product-image") {
        const { index } = event.target.dataset;
        this.showModalBox(parseInt(index));
        view.modalContainer.classList.add("show-modal");
      }
    });

    addEventListener("click", (event) => {
      if (event.target == view.modalContainer) {
        view.modalContainer.classList.remove("show-modal");
      }
    });
    view.closeButton.addEventListener("click", () => {
      view.modalContainer.classList.remove("show-modal");
    });
  },
};

const cart = {
  products: [],
  addToCart(id, product, action) {
    const addItemToCart = this.saveToCart();
    this.addToCart = addItemToCart;
    addItemToCart(id, product, action);
  },
  saveToCart() {
    this.saveToCart.cache = {};
    return (id, product, action) => {
      product = JSON.parse(product);
      if (id in this.saveToCart.cache) {
        product.id = id;
        return this.updateCart(product, action);
      }
      this.saveToCart.cache[id] = id;
      return this.insertIntoCart(id, product);
    };
  },
  insertIntoCart(id, product) {
    product.id = id;
    product.count = 1;
    this.products.unshift(product);
    this.renderTotalItems();
  },
  updateCart(product, action) {
    let products = [];
    switch (action) {
      case "add":
        products = this.increaseItemQuantity(product);
        break;
      case "minus":
        if (product.count - 1) {
          products = this.subtractCartItem(product);
          break;
        }
        products = this.removeCartItem(product);
        break;
      default:
        products = this.products;
        break;
    }
    this.products = products;
    this.renderTotalItems();
    this.cartSummary();
    if (this.products.length === 0) {
      this.cartEmpty();
    }
  },
  cartEmpty() {
    this.saveToCart.cache = {};
    const cartEmpty = view.createElement(
      "div",
      { class: "cart-empty" },
      "Your cart is empty."
    );
    view.summaryContainer.appendChild(cartEmpty);
  },
  increaseItemQuantity(product) {
    const products = this.products.map((item) => {
      if (item.id === product.id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    return products;
  },
  subtractCartItem(product) {
    const products = this.products.map((item) => {
      if (item.id === product.id) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    return products;
  },
  removeCartItem(product) {
    const products = this.products.filter((item) => item.id !== product.id);
    return products;
  },
  renderTotalItems() {
    const total = this.products.reduce((acc, cur) => acc + cur.count, 0);
    view.totalItems.textContent = total;
    view.summaryTotalItems.textContent = total;
  },
  watch() {
    view.totalItems.addEventListener("click", () => {
      //show the cart summary information
      view.cartSummary.classList.add("cart-summary-display");
      this.cartSummary();
    });
    view.hideSummary.addEventListener("click", () =>
      view.cartSummary.classList.remove("cart-summary-display")
    );
    view.summaryContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("update-button")) {
        const { value } = e.target;
        const { id, action } = e.target.dataset;
        this.addToCart(id, value, action);
      }
    });
  },
  cartSummary() {
    const itemsInCart = this.products.map((item) => {
      const summaryContent = view.createElement(
        "div",
        { class: "summary-content" },
        null
      );
      const firstSection = view.createElement(
        "div",
        {
          class: "first-section",
        },
        null
      );
      const image = view.createElement(
        "span",
        { role: "img", "aria-label": item.name },
        item.emoji
      );
      const itemName = view.createElement(
        "h3",
        { class: "item-name" },
        item.name
      );
      const secondSection = view.createElement(
        "div",
        { class: "second-section" },
        null
      );
      const quantityLabel = view.createElement(
        "span",
        { class: "quantity-label" },
        "Quantity"
      );
      const updateQuantitySection = view.createElement(
        "div",
        { class: "update-quantity" },
        null
      );
      const decrementButton = view.createElement(
        "button",
        {
          class: "update-button",
          value: JSON.stringify(item),
          "data-action": "minus",
          "data-id": item.id,
        },
        "-"
      );
      const quantityView = view.createElement(
        "div",
        { class: "quantity" },
        item.count
      );
      const incrementButton = view.createElement(
        "button",
        {
          class: "update-button",
          value: JSON.stringify(item),
          "data-action": "add",
          "data-id": item.id,
        },
        "+"
      );
      firstSection.appendChild(image);
      firstSection.appendChild(itemName);
      secondSection.appendChild(quantityLabel);
      updateQuantitySection.appendChild(decrementButton);
      updateQuantitySection.appendChild(quantityView);
      updateQuantitySection.appendChild(incrementButton);
      secondSection.appendChild(updateQuantitySection);
      summaryContent.appendChild(firstSection);
      summaryContent.appendChild(secondSection);
      return summaryContent;
    }, this);
    view.summaryContainer.innerHTML = "";
    itemsInCart.forEach((content) => {
      view.summaryContainer.appendChild(content);
    });
  },
};

window.addEventListener(
  "DOMContentLoaded",
  () => mealStore.showProducts(products, false),
  mealStore.showCategories(categories),
  cart.renderTotalItems()
);
window.addEventListener("load", function () {
  view.footerYear.textContent = new Date().getFullYear();
  mealStore.watchMealStore();
  cart.watch();
});

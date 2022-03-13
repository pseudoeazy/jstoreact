import React from "react";

export default function Product(props) {
  const [isAnimate, setIsAnimate] = React.useState(false);

  React.useEffect(() => {
    setIsAnimate(!isAnimate);
  }, [props.isAnimate]);

  return (
    <div
      className={`product ${isAnimate && "sort-product"}`}
      data-product-id={`${props.id + props.product.name}`}
    >
      <div className="product-img">
        <span
          role="img"
          aria-label="Grape"
          data-icon="product-image"
          data-index={props.id}
        >
          {props.product.emoji}
        </span>
      </div>
      <div className="product-content">
        <span className="product-name">{props.product.name}</span>
        <span className="product-price">
          ${(Math.round(props.product.price * 100) / 100).toFixed(2)}
        </span>
        <button
          id={`${props.id + props.product.name}`}
          className="add"
          value={JSON.stringify(props.product)}
          data-action="add"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

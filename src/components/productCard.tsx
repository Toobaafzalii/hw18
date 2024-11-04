import { useState } from "react";
import { addToCart, removeFromCart } from "../reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

interface ICardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ICardProps> = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: IRootState) => state.cart.cartItems);

  const [isInCart, setIsInCart] = useState(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    return (
      storedCartItems.findIndex(
        (item: IProduct) => item.id === props.product.id
      ) !== -1
    );
  });

  const handleClick = (id: number) => {
    setIsInCart(!isInCart);
    console.log(cartItems);
    if (isInCart) {
      dispatch(removeFromCart(id));
      const updatedCart = cartItems.filter((item: IProduct) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      dispatch(addToCart(props.product));
      const updatedCart = [...cartItems, props.product];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="flec flex-col justify-between items-start gap-y-3 p-2 border-2 rounded-lg ">
      <div className="w-60 h-60 overflow-hidden self-center mx-auto">
        {props.product.images && (
          <img
            src={props.product.images[0]}
            alt={props.product.title}
            className="object-contain self-center mx-auto"
          />
        )}
      </div>
      <p>{props.product.title}</p>
      <p>${props.product.price}</p>
      <p>{props.product.shippingInformation}</p>
      <button
        onClick={() => handleClick(props.product.id)}
        className={`px-3 py-2 ${isInCart ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

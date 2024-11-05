import { useSelector } from "react-redux";
import { CartItem } from "./cartItem";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ICartModalProps {
  onClose: () => void;
}

export const CartModal: React.FC<ICartModalProps> = (props) => {
  const cartItems = useSelector((state: IRootState) => state.cart.cartItems);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {}, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      closeTimeoutRef.current = setTimeout(props.onClose, 5000);
    }
  }, [cartItems.length, props.onClose]);

  return (
    <div className="absolute w-96 bg-white top-24 right-10 flex flex-col justify-between items-center gap-2 p-4">
      {cartItems.length === 0 ? (
        <p className="text-center bg-white text-gray-500">Cart is Empty</p>
      ) : (
        cartItems.map((item: IProduct) => (
          <CartItem item={item} key={item.id} />
        ))
      )}
      <Link to={"/CheckOut"}>
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            cartItems.length === 0 ? "bg-gray-400" : " hover:bg-blue-400"
          }`}
          disabled={cartItems.length === 0}
          onClick={props.onClose}
        >
          Checkout
        </button>
      </Link>
    </div>
  );
};

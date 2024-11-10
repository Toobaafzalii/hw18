import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

interface ICardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ICardProps> = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: IRootState) => state.cart.cartItems);

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(
      cartItems?.some((item: IProduct) => item.id === props.product.id)
    );
  }, [cartItems, props.product.id]);

  const handleClick = (id: number) => {
    setIsInCart(!isInCart);
    console.log(cartItems);
    if (isInCart) {
      dispatch(removeFromCart(id));
      const updatedCart = cartItems.filter((item: IProduct) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      dispatch(addToCart({ ...props.product, quantity: 1 }));
      const updatedCart = [...cartItems, { ...props.product, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
      <div className="w-full h-48 overflow-hidden rounded-t-lg">
        {props.product.images && (
          <img
            src={props.product.images[0]}
            alt={props.product.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        )}
      </div>
      <div className="flex flex-col justify-between p-4">
        <h2
          className="text-xl font-bold mb-2 truncate"
          title={props.product.title}
        >
          {props.product.title}
        </h2>
        <p className="text-gray-700 mb-2">${props.product.price}</p>
        <p className="text-gray-500 text-sm mb-4 min-h-10">
          {props.product.shippingInformation}
        </p>
        <div className="min-h-12">
          <button
            onClick={() => handleClick(props.product.id)}
            className={`w-full py-2 rounded-md font-semibold transition duration-300 ease-in-out hover:bg-opacity-75 ${
              isInCart ? "bg-red-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

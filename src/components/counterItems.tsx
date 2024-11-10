import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartItem } from "../reducer/reducer";

interface ICounterProps {
  item: ICartProduct;
}

interface IQuantity {
  itemId?: number;
  count: number;
  totalPrice: number;
}

export const CounterItems: React.FC<ICounterProps> = (props) => {
  const dispatch = useDispatch();

  const updateQuantity = (action: "INCREASE" | "DECREASE") => {
    if (props.item.quantity === 1 && action === "DECREASE") {
      dispatch(removeFromCart(props.item.id));
      return;
    }
    dispatch(
      updateCartItem({
        id: props.item.id,
        action,
      })
    );

    // setQuantity((prevState) => ({
    //   itemId: prevState.itemId,
    //   count: Math.max(prevState.count + change, 0),
    //   totalPrice: (prevState.count + change) * props.item.price,
    // }));
  };

  return (
    <div
      key={props.item.id}
      className="bg-white w-full rounded-lg shadow-md flex flex-col justify-between sm:flex-row items-center gap-8 md:gap-36 p-4 pr-8"
    >
      <div className="w-full md:w-40 overflow-hidden rounded-lg mx-atou">
        <img
          src={props.item.images[0]}
          alt={props.item.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">{props.item.title}</h2>
          <p className="text-gray-500 text-sm">{props.item.description}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-4 px-4">
        <div className="flex justify-center items-center">
          <img
            src="minus-circle-svgrepo-com.svg"
            alt="minus"
            className="w-8 h-8 cursor-pointer hover:scale-110"
            onClick={() => updateQuantity("DECREASE")}
          />
          <span className="text-lg font-semibold px-2 min-w-10 text-center">
            {props.item.quantity}
          </span>
          <img
            src="plus-circle-svgrepo-com.svg"
            alt="plus"
            className="w-8 h-8 cursor-pointer hover:scale-110"
            onClick={() => updateQuantity("INCREASE")}
          />
        </div>
        <p className="text-2xl font-semibold text-gray-400">
          ${(Number(props.item.price) * props.item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

import { useDispatch } from "react-redux";
import { removeFromCart } from "../reducer/reducer";

export const CartItem: React.FC<ICartItemProps> = (props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(props.item.id));
  };

  return (
    <div className="flex w-full bg-white justify-between items-start border-2 rounded-md p-1">
      <div className="w-20 h-20 overflow-hidden ">
        <img
          src={props.item.images[0]}
          alt={props.item.title}
          className="object-contain  "
        />
      </div>
      <div className="flex flex-col justify-around items-start">
        <p>{props.item.title}</p>
        <p>{props.item.price}</p>
      </div>
      <button className="bg-blue-500 px-3 py-2 self-end" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};

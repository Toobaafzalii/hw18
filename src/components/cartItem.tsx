import { useDispatch } from "react-redux";
import { removeFromCart } from "../reducer/reducer";

export const CartItem: React.FC<ICartItemProps> = (props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(props.item.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center p-2">
      <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg mr-4">
        <img
          src={props.item.images[0]}
          alt={props.item.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-2 text-center">
            {props.item.title}
          </h2>
        </div>
        <div className="flex flex-col items-end sm:items-start">
          <p className="text-lg font-bold text-gray-700">${props.item.price}</p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

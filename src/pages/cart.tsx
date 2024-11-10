import { useSelector } from "react-redux";
import { CounterItems } from "../components/counterItems";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: IRootState) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (acc: number, item: ICartProduct) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      <div className="sticky top-0 w-full inline-flex justify-between items-center gap-10 bg-slate-700 py-7 px-10">
        <h1 className="text-gray-200 text-3xl font-bold text-nowrap">
          SHOPPING CART
        </h1>
      </div>
      <div className="container mx-auto flex flex-col justify-start items-center gap-4 py-10 px-6">
        {cartItems.length === 0 ? (
          <p className="text-lg font-medium text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item: ICartProduct) => (
            <>
              <CounterItems key={item.title} item={item} />
            </>
          ))
        )}
        {cartItems.length !== 0 && (
          <>
            <p className="text-2xl font-semibold">
              {" "}
              {`TOTAL PRICE: $${totalPrice.toFixed(2)}`}
            </p>
            <Link to={"/checkout"}>
              <button className="text-xl font-medium text-gray-600 py-1.5 px-3 border-2 border-gray-600 rounded-lg my-2">
                Next Step
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

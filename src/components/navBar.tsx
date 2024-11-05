import { useEffect, useState } from "react";
import { useDebounce } from "../utils/debounce";
import { CartModal } from "./cartModal";

interface Props {
  onSearch: (text: string) => void;
}
export const NavBar: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedValue = useDebounce(inputValue, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 w-full inline-flex justify-between items-center gap-10 bg-slate-700 py-6 px-10">
      <h1 className="text-gray-200 text-3xl font-bold text-nowrap">
        SHOPPING SITE
      </h1>
      <input
        type="text"
        placeholder="Search a product ..."
        className="w-full bg-slate-50 rounded-lg text-gray-800 text-lg font-semibold py-2 px-6"
        onChange={handleChange}
      />
      <div
        className="relative px-3 pr-4 py-1 bg-gray-400 rounded-md hover:bg-gray-300"
        onClick={() => (isOpen ? setIsOpen(!isOpen) : setIsOpen(true))}
      >
        <img src="./cart.svg" alt="cart" className="w-10 h-10" />
      </div>
      {isOpen && <CartModal onClose={handleCloseModal} />}
    </div>
  );
};

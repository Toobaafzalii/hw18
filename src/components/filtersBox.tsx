import { useState } from "react";

interface IProps {
  onSortChange: (sort: string) => void;
  onDeliveryChange: (delivery: string) => void;
}

export const FiltersBox: React.FC<IProps> = (props) => {
  const [sort, setSort] = useState("");
  const [fastOnly, setFastOnly] = useState(false);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
    props.onSortChange(event.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFastOnly(e.target.checked);
    if (e.target.checked === true) {
      props.onDeliveryChange(e.target.value);
      return;
    }
    props.onDeliveryChange("");
  };

  const handleClearFilter = () => {
    setSort("");
    setFastOnly(false);
    props.onDeliveryChange("");
    props.onSortChange("");
  };

  return (
    <div className="flex flex-wrap sm:flex-col sm:sticky bg-slate-600 p-10 gap-4 sm:gap-10 sm:min-h-screen shadow-md">
      <h3 className="text-white sm:sticky text-xl font-bold mb-4">
        Filter Products
      </h3>

      <div className="sm:sticky flex flex-col space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="group1"
            value="asc"
            checked={sort === "asc"}
            onChange={handleSortChange}
            className="mr-2"
          />
          <label htmlFor="asc" className="text-white font-semibold">
            Ascending
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="group1"
            value="desc"
            checked={sort === "desc"}
            onChange={handleSortChange}
            className="mr-2"
          />
          <label htmlFor="desc" className="text-white font-semibold">
            Descending
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="group1" className="mr-2" />
          <label className="text-white font-semibold">
            Include Out of Stock
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="group1"
            className="mr-2"
            onChange={handleFilterChange}
            value="ships overnight"
            checked={fastOnly}
          />
          <label className="text-white font-semibold">Fast Delivery Only</label>
        </div>
      </div>

      <button
        className="bg-slate-200 w-full text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-300"
        onClick={handleClearFilter}
      >
        Clear Filters
      </button>
    </div>
  );
};

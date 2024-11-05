import { useState } from "react";

interface IProps {
  onFilter: (sort: string) => void;
}

export const FiltersBox: React.FC<IProps> = (props) => {
  const [sort, setSort] = useState("");

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
    props.onFilter(sort);
  };

  const handleClearFilter = () => {
    setSort("");
    props.onFilter("");
  };

  return (
    <div className="sticky top-24  bg-slate-600 flex flex-col justify-start items-start gap-10 h-screen p-10">
      <p>Filter Products</p>
      <div className="inline-flex gap-2">
        <input
          name="group1"
          type="radio"
          value="asc"
          checked={sort === "asc"}
          onChange={handleSortChange}
        />
        <label title="">Ascending</label>
      </div>
      <div className="inline-flex gap-2">
        <input
          name="group1"
          type="radio"
          value="desc"
          checked={sort === "desc"}
          onChange={handleSortChange}
        />
        <label title="">Descending</label>
      </div>
      <div className="inline-flex gap-2 text-nowrap">
        <input name="group1" type="checkbox" />
        <label title="">Include Out of Stock</label>
      </div>
      <div className="inline-flex gap-2 text-nowrap">
        <input name="group1" type="checkbox" />
        <label title="">Fast Delivery Only</label>
      </div>
      <button className="bg-slate-200 p-2" onClick={handleClearFilter}>
        Clear Filters
      </button>
    </div>
  );
};

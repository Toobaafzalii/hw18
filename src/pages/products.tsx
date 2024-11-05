import { useEffect, useState } from "react";
import { NavBar } from "../components/navBar";
import { FiltersBox } from "../components/filtersBox";
import { CardsContainer } from "../components/cardsContainer";
import { useMutation } from "@tanstack/react-query";
import { fetchProducts } from "../api/product.api";

const Products = () => {
  const [fetchedData, setFetchedData] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState<IProductsFnProps>({
    search: "",
    sort: "",
    skip: 0,
  });
  const products = useMutation<IProductApiResponse, unknown, IProductsFnProps>({
    mutationKey: ["products"],
    mutationFn: (data) => fetchProducts(data),
  });

  useEffect(() => {
    products.mutate(filters, {
      onSuccess(data) {
        setFetchedData((prevData) => [...prevData, ...data.products]);
      },
    });
  }, [filters]);

  const handleLoadMore = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      skip: prevFilters.skip + 30,
    }));
  };

  return (
    <>
      <NavBar
        onSearch={(search) =>
          setFilters((filters) => {
            return {
              ...filters,
              search,
              skip: 0,
            };
          })
        }
      />
      <section className="flex justify-between">
        <FiltersBox
          onFilter={(sort: string) => {
            setFilters((filters) => {
              return {
                ...filters,
                sort,
                skip: 0,
              };
            });
          }}
        />
        <div className="container mx-auto ">
          <CardsContainer data={fetchedData} />

          {products.data &&
            products.data.total > products.data.products.length && (
              <button
                onClick={handleLoadMore}
                disabled={products.isPending}
                className="grid w-full p-4 pb-10 mx-atou"
              >
                Load More
              </button>
            )}
        </div>
      </section>
    </>
  );
};
export default Products;

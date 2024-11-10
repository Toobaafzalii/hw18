import { useEffect, useState } from "react";
import { NavBar } from "../components/navBar";
import { FiltersBox } from "../components/filtersBox";
import { CardsContainer } from "../components/cardsContainer";
import { useMutation } from "@tanstack/react-query";
import { fetchProducts } from "../api/product.api";
import React from "react";

const Products = () => {
  const [fetchedData, setFetchedData] = useState<IProduct[]>([]);
  const [fastOnly, setFastOnly] = useState<boolean>(false);
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

  // useEffect(() => {
  //   let filteredProducts = fetchedData;
  //   if (filters.filter === "ships overnight") {
  //     filteredProducts = products.data?.products.filter((product) => {
  //       console.log(product.shippingInformation);
  //       return product.shippingInformation === "Ships overnight";
  //     });
  //   }

  //   if (filteredProducts) {
  //     setFetchedData(filteredProducts);
  //   }
  // }, [products.data, filters.filter]);

  const handleLoadMore = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      skip: prevFilters.skip + 20,
    }));
  };

  return (
    <div className="min-h-screen">
      <NavBar
        onSearch={(search) => {
          setFilters((filters) => {
            return {
              ...filters,
              search,
              skip: 0,
            };
          });
          setFetchedData([]);
        }}
      />
      <section className="relative flex flex-col sm:flex-row justify-between">
        <FiltersBox
          onSortChange={(sort) => {
            setFilters((filters) => {
              return {
                ...filters,
                sort,
                skip: 0,
              };
            });
            setFetchedData([]);
          }}
          onDeliveryChange={(delivery: string) => {
            setFastOnly(delivery !== "");
          }}
        />
        <div className="container mx-auto ">
          <CardsContainer fastOnly={fastOnly} data={fetchedData} />

          {products.data &&
            products.data.total > products.data.products.length && (
              <button
                onClick={handleLoadMore}
                disabled={products.isPending}
                className="grid w-full p-4 pb-10 mx-atou text-xl font-medium "
              >
                Load More
              </button>
            )}
        </div>
      </section>
    </div>
  );
};
export default Products;

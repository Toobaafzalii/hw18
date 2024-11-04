import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/product.api";
import { ProductCard } from "./productCard";

export const CardsContainer: React.FC = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
      {products.isSuccess &&
        products.data.products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </section>
  );
};

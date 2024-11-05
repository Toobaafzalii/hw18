import { ProductCard } from "./productCard";

interface Props {
  data: IProduct[];
}
export const CardsContainer: React.FC<Props> = ({ data }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
      {data.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

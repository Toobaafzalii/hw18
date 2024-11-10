import { ProductCard } from "./productCard";

interface Props {
  data: IProduct[];
  fastOnly: boolean;
}
export const CardsContainer: React.FC<Props> = ({ data, fastOnly }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-10">
      {data.map((product: IProduct) => {
        if (fastOnly) {
          if (product.shippingInformation === "Ships overnight") {
            return <ProductCard product={product} key={product.id} />;
          }
        } else {
          return <ProductCard product={product} key={product.id} />;
        }
      })}
    </section>
  );
};

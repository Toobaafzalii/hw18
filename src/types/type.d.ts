interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface ICartProduct extends IProduct {
  quantity: number;
}

interface IProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface IProductApiResponse {
  skip?: number;
  limit?: number;
  total: number;
  products: IProduct[];
}

type IRootState = ReturnType<typeof store.getState>;

interface ICartItemProps {
  item: IProduct;
}

interface IProductsFnProps {
  skip: number;
  search?: string;
  sort?: string;
}

import { AxiosError } from "axios";
import { api } from "./api.client";

export const fetchProducts = async ({
  search,
  sort,
  skip,
}: IProductsFnProps): Promise<IProductApiResponse> => {
  try {
    let params = "?";
    params = params + `limit=20&skip=${skip}`;
    if (search) {
      params = params + `&q=${search}`;
    }
    if (sort) {
      params = params + `&sortBy=title&order=${sort}`;
    }

    const response = await api.get(`/products${params}`);

    const { total, products } = response.data;

    return {
      total,
      products,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject(error as AxiosError);
  }
};

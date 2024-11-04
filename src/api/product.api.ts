import { AxiosError } from "axios";
import { api } from "./api.client";

export const fetchProducts = async (): Promise<IProductApiResponse> => {
  try {
    const response = await api.get("/products");

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject(error as AxiosError);
  }
};

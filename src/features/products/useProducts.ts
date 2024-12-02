import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: products, total: count, last_page: pageCount } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({ page }),
  });

  // PRE-FETCHING
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["products", page + 1],
      queryFn: () => getProducts({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", page - 1],
      queryFn: () => getProducts({ page: page - 1 }),
    });
  }
  return { products, count, isLoading, error };
}

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";
import { useSearchParams } from "react-router-dom";

export function useUsers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    error,
    data: { data: users, total: count, last_page: pageCount } = {},
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers({ page }),
  });

  // PRE-FETCHING
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["products", page + 1],
      queryFn: () => getUsers({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", page - 1],
      queryFn: () => getUsers({ page: page - 1 }),
    });
  }

  return { users, count, isLoading, error };
}

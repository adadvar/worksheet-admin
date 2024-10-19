import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorksheets } from "../../services/apiWorksheets";
import { useSearchParams } from "react-router-dom";

export function useWorksheets() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: worksheets, total: count, last_page: pageCount } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["worksheets", page],
    queryFn: () => getWorksheets({ page }),
  });

  // PRE-FETCHING
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["worksheets", page + 1],
      queryFn: () => getWorksheets({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["worksheets", page - 1],
      queryFn: () => getWorksheets({ page: page - 1 }),
    });
  }
  return { worksheets, count, isLoading, error };
}

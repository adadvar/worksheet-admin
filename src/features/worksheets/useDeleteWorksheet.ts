import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteWorksheet as deleteWorksheetApi } from "../../services/apiWorksheets";

export function useDeleteWorksheet() {
  const queryClient = useQueryClient();

  const { mutate: deleteWorksheet, isPending: isDeleting } = useMutation({
    mutationFn: deleteWorksheetApi,
    onSuccess: () => {
      toast.success("کاربرگ با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["worksheets"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteWorksheet };
}

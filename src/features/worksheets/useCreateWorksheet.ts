import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorksheet as createWorksheetApi } from "../../services/apiWorksheets";
import toast from "react-hot-toast";

export function useCreateWorksheet() {
  const queryClinet = useQueryClient();

  const { mutate: createWorksheet, isPending: isCreating } = useMutation({
    mutationFn: createWorksheetApi,
    onSuccess: () => {
      toast.success("کاربرگ جدید ایجاد شد");
      queryClinet.invalidateQueries({ queryKey: ["worksheets"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createWorksheet };
}

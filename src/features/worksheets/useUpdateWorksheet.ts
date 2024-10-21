import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorksheet as updateWorksheetApi } from "../../services/apiWorksheets";
import toast from "react-hot-toast";

export function useUpdateWorksheet() {
  const queryClinet = useQueryClient();

  const { mutate: updateWorksheet, isPending: isUpdating } = useMutation({
    //@ts-ignore
    mutationFn: ({ id, newWorksheetData }) =>
      updateWorksheetApi(id, newWorksheetData),
    onSuccess: () => {
      toast.success("کاربرگ بروزرسانی شد");
      queryClinet.invalidateQueries({ queryKey: ["worksheets"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateWorksheet };
}

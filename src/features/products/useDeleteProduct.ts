import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: (data) => {
      toast.success(data.message || "کاربرگ با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}

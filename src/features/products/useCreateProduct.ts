import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const queryClinet = useQueryClient();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: createProductApi,
    onSuccess: (data) => {
      toast.success(data.message || "کاربرگ جدید ایجاد شد");
      queryClinet.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProduct };
}

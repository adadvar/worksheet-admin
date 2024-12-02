import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateProduct() {
  const queryClinet = useQueryClient();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    //@ts-ignore
    mutationFn: ({ slug, newProductData }) =>
      updateProductApi(slug, newProductData),
    onSuccess: (data) => {
      toast.success(data.message || "کاربرگ بروزرسانی شد");
      queryClinet.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateProduct };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useUpdateUser() {
  const queryClinet = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    //@ts-ignore
    mutationFn: ({ id, newUserData }) => updateUserApi(id, newUserData),
    onSuccess: () => {
      toast.success("کاربر بروزرسانی شد");
      queryClinet.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}

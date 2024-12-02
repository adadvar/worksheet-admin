import { useMutation } from "@tanstack/react-query";
import { uploadFile as uploadFileApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUploadFile() {
  const {
    mutate: uploadFile,
    data,
    isPending: isFiling,
  } = useMutation({
    //@ts-ignore
    mutationFn: (file) => uploadFileApi(file),

    onError: (err) => toast.error(err.message),
  });

  return { isFiling, data, uploadFile };
}

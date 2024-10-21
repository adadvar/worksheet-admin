import { useMutation } from "@tanstack/react-query";
import { uploadFile as uploadFileApi } from "../../services/apiWorksheets";
import toast from "react-hot-toast";

export function useUploadFile() {
  const { mutate: uploadFile, isPending: isFiling } = useMutation({
    //@ts-ignore
    mutationFn: (file) => uploadFileApi(file),
    onSuccess: () => {
      toast.success("New File successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isFiling, uploadFile };
}

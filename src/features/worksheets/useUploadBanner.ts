import { useMutation } from "@tanstack/react-query";
import { uploadBanner as uploadBannerApi } from "../../services/apiWorksheets";
import toast from "react-hot-toast";

export function useUploadBanner() {
  const { mutate: uploadBanner, isPending: isBannering } = useMutation({
    //@ts-ignore
    mutationFn: (banner) => uploadBannerApi(banner),
    onSuccess: () => {
      toast.success("New Banner successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isBannering, uploadBanner };
}

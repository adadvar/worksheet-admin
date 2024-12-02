import { useMutation } from "@tanstack/react-query";
import { uploadBanner as uploadBannerApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUploadBanner() {
  const {
    mutate: uploadBanner,
    data,
    isPending: isBannering,
  } = useMutation({
    //@ts-ignore
    mutationFn: (banner) => uploadBannerApi(banner),

    onError: (err) => toast.error(err.message),
  });

  return { isBannering, data, uploadBanner };
}

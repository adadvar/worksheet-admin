import { useMutation } from "@tanstack/react-query";
import { downloadPdf as downloadPdfApi } from "../../services/apiWorksheets";

export function useDownloadPdf() {
  const { mutate: downloadPdf, isPending: isDownloading } = useMutation({
    mutationFn: downloadPdfApi,
  });

  return { isDownloading, downloadPdf };
}
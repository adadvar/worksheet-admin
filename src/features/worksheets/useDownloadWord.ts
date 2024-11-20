import { useMutation } from "@tanstack/react-query";
import { downloadWord as downloadWordApi } from "../../services/apiWorksheets";

export function useDownloadWord() {
  const { mutate: downloadWord, isPending: isDownloading } = useMutation({
    mutationFn: downloadWordApi,
  });

  return { isDownloading, downloadWord };
}

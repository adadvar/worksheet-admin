import axiosInstance from "./axiosInstance";

interface Props {
  page?: number;
}
export async function getWorksheets({ page = 1 }: Props) {
  try {
    const res = await axiosInstance.get("/worksheet/list", {
      params: { page },
    });
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Worksheets could not be loaded");
  }
}

export async function uploadBanner(params: any) {
  try {
    const res = await axiosInstance.post("/worksheet/upload/banner", params);
    return res.data;
  } catch (err: any) {
    throw new Error("Worksheet banner could not be uploaded");
  }
}

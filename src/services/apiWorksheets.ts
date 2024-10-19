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
  } catch (err) {
    console.log(err);
    throw new Error("Worksheets could not be loaded");
  }
}

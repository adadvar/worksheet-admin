import { Axios } from "./axiosInstance";

export interface Category {
  banner: string | null;
  icon: string | null;
  id: number;
  name: string;
  parent_id: number | null;
  slug: string;
  type: string;
  updated_at: Date;
  created_at: Date;
}

export async function getCategories() {
  try {
    const res = await Axios.get("/category");
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Categories could not be loaded");
  }
}

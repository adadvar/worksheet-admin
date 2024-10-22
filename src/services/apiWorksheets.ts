import { Category } from "./apiCategory";
import { Axios, AxiosAuth, AxiosFile } from "./axiosInstance";

export interface Worksheet {
  age: string;
  banner: string;
  grade_id: number | null;
  subject_id: number | null;
  topic_id: number | null;
  grade: Category;
  subject: Category;
  topic: Category;
  banner_link: string;
  category_id: number;
  description: string;
  file: string;
  file_link: string;
  id: number;
  name: string;
  price: number;
  publish_at: null;
  slug: string;
  updated_at: Date;
  created_at: Date;
  deleted_at: null | Date;
}

interface Props {
  page?: number;
}
export async function getWorksheets({ page = 1 }: Props) {
  try {
    const res = await Axios.get("/worksheet/list", {
      params: { page },
    });
    return res.data;
  } catch (err: any) {
    console.log(err.message);
    throw new Error("کاربرگ ها بارگزاری نشدند");
  }
}

export async function uploadBanner(params: any) {
  try {
    const res = await AxiosFile.post("/worksheet/upload/banner", params);
    return res.data;
  } catch (err: any) {
    console.log(err.message);

    throw new Error("بنر بارگذاری نشد");
  }
}

export async function uploadFile(params: any) {
  try {
    const res = await AxiosFile.post("/worksheet/upload/file", params);
    return res.data;
  } catch (err: any) {
    console.log(err.message);

    throw new Error("فایل بارگذاری نشد");
  }
}

export async function createWorksheet(worksheet: Worksheet) {
  try {
    const res = await AxiosAuth.post("/worksheet", worksheet);
    return res.data;
  } catch (err: any) {
    console.log(err.message);

    throw new Error("کاربرگ ایجاد نشد");
  }
}

export async function updateWorksheet(id: number, params: any) {
  try {
    const res = await AxiosAuth.put(`/worksheet/${id}`, params);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("کاربرگ بروزرسانی نشد");
  }
}

export async function deleteWorksheet(id: number) {
  try {
    const res = await AxiosAuth.delete(`/worksheet/${id}`);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("کاربرگ حذف نشد");
  }
}

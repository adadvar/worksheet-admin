import { axiosInstance, axiosInstanceWithAuth } from "./axiosInstance";

export interface Worksheet {
  age: string;
  banner: string;
  grade_id: number | null;
  subject_id: number | null;
  topic_id: number | null;
  banner_link: string;
  category_id: number;
  description: string;
  file: string;
  file_link: string;
  id: number;
  name: string;
  price: string;
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
    const res = await axiosInstanceWithAuth.post(
      "/worksheet/upload/banner",
      params
    );
    return res.data;
  } catch (err: any) {
    console.log(err);

    throw new Error("Worksheet banner could not be uploaded");
  }
}

export async function uploadFile(params: any) {
  try {
    const res = await axiosInstanceWithAuth.post(
      "/worksheet/upload/file",
      params
    );
    return res.data;
  } catch (err: any) {
    console.log(err);

    throw new Error("Worksheet file could not be uploaded");
  }
}

export async function createWorksheet(worksheet: Worksheet) {
  try {
    console.log("worksheet", worksheet);
    const res = await axiosInstanceWithAuth.post("/worksheet", worksheet);
    return res.data;
  } catch (err) {
    console.log(err);

    throw new Error("Worksheet file could not be uploaded");
  }
}

export async function updateWorksheet(id: number, params: any) {
  try {
    const res = await axiosInstanceWithAuth.put(`/worksheet/${id}`, params);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Worksheet could not be updated");
  }
}

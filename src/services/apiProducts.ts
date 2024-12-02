import { Category } from "./apiCategory";
import { Axios, AxiosAuth, AxiosFile } from "./axiosInstance";

export interface Product {
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
  file_pdf: string;
  file_word: string;
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
export async function getProducts({ page = 1 }: Props) {
  try {
    const res = await Axios.get("/product/list", {
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
    const res = await AxiosFile.post("/product/upload/banner", params);
    return res.data;
  } catch (err: any) {
    console.log(err.message);

    throw new Error("بنر بارگذاری نشد");
  }
}

export async function uploadFile(params: any) {
  try {
    const res = await AxiosFile.post("/product/upload/file", params);
    return res.data;
  } catch (err: any) {
    console.log(err.message);

    throw new Error("فایل بارگذاری نشد");
  }
}

export async function createProduct(product: Product) {
  try {
    const res = await AxiosAuth.post("/product", product);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("could not create product");
    }
  }
}

export async function updateProduct(slug: string, params: any) {
  try {
    const res = await AxiosAuth.put(`/product/${slug}`, params);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("could not update product");
    }
  }
}

export async function deleteProduct(slug: string) {
  try {
    const res = await AxiosAuth.delete(`/product/${slug}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("could not delete product");
    }
  }
}

async function downloadFile(url: string, fileName: string) {
  try {
    const res = await AxiosAuth.get(url, {
      responseType: "blob", // Set response type to blob for file download
    });

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(new Blob([res.data]));

    // Create a link element and trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName); // Set the desired file name
    document.body.appendChild(link);
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(blobUrl);
  } catch (err: any) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(`could not download product ${fileName}`);
    }
  }
}
//@ts-ignore
export async function downloadPdf({ slug, name }) {
  await downloadFile(`/product/${slug}/download-pdf`, `${name}.pdf`);
}
//@ts-ignore

export async function downloadWord({ slug, name }) {
  await downloadFile(`/product/${slug}/download-word`, `${name}.docx`);
}

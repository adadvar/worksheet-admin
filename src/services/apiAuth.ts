import { Axios, AxiosAuth } from "./axiosInstance";

export interface User {
  avatar: string | null;
  city_id: number | null;
  created_at: Date;
  deleted_at: null;
  email: string;
  google_id: string | null;
  id: number;
  mobile: string;
  name: string;
  roles: Role[];
  updated_at: Date;
  verified_at: Date | null;
  website: string | null;
}

interface Role {
  created_at: Date;
  id: number;
  name: string;
  pivot: Pivot;
  updated_at: Date;
}

interface Pivot {
  role_id: number;
  user_id: number;
}

export async function login(params: any) {
  try {
    const res = await Axios.post("/login", params);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("login failed");
  }
}

export async function logout() {
  try {
    await AxiosAuth.post("/logout");
  } catch (err: any) {
    console.log(err);
    throw new Error("logout failed");
  }
}

export async function getCurrentUser1() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return user;
}

export async function getCurrentUser() {
  try {
    const res = await AxiosAuth.get("/user/me");
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("User could not be loaded");
  }
}
interface Props {
  page?: number;
}

export async function getUsers({ page = 1 }: Props) {
  try {
    const res = await AxiosAuth.get("/user/list", { params: { page } });
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Users could not be loaded");
  }
}
//TODO: for updating users to admin mode , use confirmation dialog
export async function updateUser(id: number, params: any) {
  try {
    const res = await AxiosAuth.put(`/user/${id}`, params);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Users could not be updated");
  }
}

export async function deleteUser(id: number) {
  try {
    const res = await AxiosAuth.delete(`/user/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Users could not be deleted");
  }
}

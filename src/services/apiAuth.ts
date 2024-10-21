// import { useLocalStorageState } from "../hooks/useLocalStorageState";

import { Axios, AxiosAuth } from "./axiosInstance";

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

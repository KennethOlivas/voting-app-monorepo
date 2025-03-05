"use client";

import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
}

export const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user?.accessToken

  if (token)
    config.headers.Authorization = `Bearer ${token}`;

  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ callbackUrl: "/login" });
    }
    return Promise.reject(error);
  }
);

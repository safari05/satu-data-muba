import axios from "axios";
import { cache } from "react";

export const instanceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURLAPI,
  timeout: 20000,
  withCredentials: false,
  headers: {},
});
instanceAxios.interceptors.request.use((config) => {
  config.cache = "no-store";
  return config;
});

export const instanceFetch = async (url, options) => {
  options = {
    ...options,
    cache: "no-store",
  };
  return await fetch(`${process.env.NEXT_PUBLIC_BASEURLAPI}${url}`, options);
};

export const instanceFetchDesaCantik = async (url, options) => {
  options = {
    ...options,
    cache: "no-store"
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL_SURVEY_API}${url}`, options);
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      // Optionally, you can throw an error to be caught by higher-level error handling
      throw new Error(errorMessage);
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

//siap delete

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURLAPI,
  timeout: 20000,
  withCredentials: false,
  headers: {},
});
instance.interceptors.request.use((config) => {
  config.cache = "no-store";
  return config;
});

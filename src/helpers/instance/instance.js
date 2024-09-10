import axios from "axios";

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

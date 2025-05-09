import { toast } from "react-toastify";
import { httpConToken, httpSinToken } from "../helpers/http";

export const loginByToken = async () => {
  try {
    const { data } = await httpConToken.get("/checktoken");

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (formData) => {
  try {
    const { data } = await httpSinToken.post("/login", formData);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return null;
  }
};

export const register = async (formData) => {
  try {
    const { data } = await httpSinToken.post("/register", formData);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return null;
  }
};

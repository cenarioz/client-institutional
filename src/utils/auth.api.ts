import axios from "axios";

export const signup = async (data: any): Promise<any> =>
  axios.post(`${process.env.NEXT_PUBLIC_AUTH_API}auth/signup`, data);

export const login = async (email: string, password: string): Promise<any> =>
  axios.post(`${process.env.NEXT_PUBLIC_AUTH_API}auth/login`, {
    email,
    password,
  });

export const checkEmail = async (email: string): Promise<any> =>
  axios.get(`${process.env.NEXT_PUBLIC_AUTH_API}auth/check-email`, {
    params: { email },
  });

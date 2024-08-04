import { useApi } from "./hooks";
const { post } = useApi();

export type SignUpForm = {
  password: string;
  email: string;
  phone: string;
};

export type SignInForm = {
  credential: string;
  password: string;
}

export interface User {
  accessToken: User | null | undefined;
  id: string;
  fullName?: string;
  gender: number;
  dateOfBirth: Date | string;
  avatarUrl?: string;
  address: Address;
}

export interface CurrentUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  roles: string[];
  phonenumber: string;
}

export interface Address {
  country?: string;
  addressLines?: string;
  locality?: string;
  region?: string;
  postcode?: string;
}

export type Authorization = CurrentUser & {
  accessToken: string;
  expiresIn: number;
}

export async function signUp(form: SignUpForm) {
  const { data } = await post<Authorization>("/auth/signup", form);
  return data;
}

export async function signInUser(form: SignInForm) {
  const { data, error } = await post<Authorization>("/auth/login", form);
  return data;
}

export async function sendPasswordResetLink(email: string) {
  const result = await post("/auth/reset-email", { email });
  return result;
}

export async function resetPassword(token: string) {
  const result = await post(`/auth/reset?token=${token}`);
  return result;
}

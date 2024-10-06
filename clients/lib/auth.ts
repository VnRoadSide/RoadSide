import { auth } from "@/auth";
import { useApi } from "./hooks";


export type AuthForm = {
  email: string;
  password: string;
};

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
  phoneNumber: string;
}

export interface Address {
  country?: string;
  addressLines?: string;
  locality?: string;
  region?: string;
  postcode?: string;
}

export type Authorization = {
  user: CurrentUser;
  accessToken: string;
  expiresIn: number;
};

declare module "next-auth" {
  interface User extends Authorization {}
  interface Session {
    user: User;
    accessToken?: string;
  }
}

export async function signUpUser(form: AuthForm) {
  const { post } = useApi();
  console.log("hit", form);
  const { data, error } = await post<Authorization>("/auth/signup", form);
  if (!error) {
  }
  console.log(data);
  return data;
}

export async function signInUser(form: AuthForm) {
  const { post } = useApi();
  const { data, error } = await post<Authorization>("/auth/login", form);
  return data;
}

export async function signOutUser() {
  const session = await auth();
  const { post } = useApi(session);
  const result = await post("/auth/logout");
  return result;
}

export async function sendPasswordResetLink(email: string) {
  const { post } = useApi();
  const result = await post("/auth/reset-email", { email });
  return result;
}

export async function resetPassword(token: string) {
  const session = await auth();
  const { post } = useApi(session);
  const result = await post(`/auth/reset?token=${token}`);
  return result;
}

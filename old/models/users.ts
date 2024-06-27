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

export interface UserLogin {
  username: string;
  password: string;
  email?: string;
  terms?: boolean;
}

export type Authorization = CurrentUser & {
  accessToken: string;
  expiresIn: number;
}

export interface signup{
  username: string;
  password: string;
  email: string;
  terms: boolean;
}
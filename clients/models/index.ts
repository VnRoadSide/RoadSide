export * from "./orders";
export * from "./products";
export * from "./settings";
export * from "./stripe";
export * from "./notification";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type PagingResult<T> = {
  data: T[];
  total: number;
}
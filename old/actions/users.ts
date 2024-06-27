import { User } from "../models/users";
import { defineApi } from "../utils";

const baseUrl = "/users";

export async function getUser() {
  const { data, error } = await defineApi().get<User>(baseUrl);

  if (error) {
    console.error("Error: ", error);
    return;
  }
  return data;
}

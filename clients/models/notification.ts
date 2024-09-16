import { User } from "@/lib/auth";

export type Notification = {
  createdOn: Date | string;
  content: string;
  url: string;
};
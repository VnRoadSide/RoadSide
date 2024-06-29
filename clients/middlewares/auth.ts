import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { defineMiddleware } from "./factory";

export const withAuth = defineMiddleware(async (request) => {
  const session = await auth();
  if (!session && request.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", request.nextUrl.basePath);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

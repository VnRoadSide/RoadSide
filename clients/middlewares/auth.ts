import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { defineMiddleware } from "./factory";
import { environment } from "@/environment";

const anonymousRoutes = [
  "/",
  "/login",
  "/register"
]; // The whitelisted routes

export const withAuth = defineMiddleware(async (request) => {
  const session = await auth();
  const pathname = request.nextUrl.pathname;
  if (!session && !anonymousRoutes.includes(pathname)) {
    const newUrl = new URL("/login", environment.appUrl);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

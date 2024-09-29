import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { defineMiddleware } from "./factory";
import { environment } from "@/environment";

const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = [
  "/",
  "/product",
  "/login",
  "/signup",
  "/reset-password",
  "/forgot-password",
  "/logout",
  "/asset"
]; // The whitelisted routes

export const withAuth = defineMiddleware(async (request) => {
  const session = await auth();
  const pathname = request.nextUrl.pathname;
  if (!session && !anonymousRoutes.includes(pathname) && !publicFileRegex.test(pathname)) {
    const newUrl = new URL("/login", environment.appUrl);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
});

import {  NextResponse } from "next/server";
import { defineMiddleware } from "./factory";
import { auth } from "@/auth";

export const header = defineMiddleware(async (request) => {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Type", "application/json");
  // const session = await auth();
  // if (session) {
  //   console.log(session.accessToken);
  //   requestHeaders.set('Authorization', `Bearer ${session.accessToken}`)
  // }

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  return response
});
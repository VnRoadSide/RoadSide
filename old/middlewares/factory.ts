import { NextMiddleware, NextMiddlewareResult } from "next/dist/server/web/types";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware;

export function createMiddleware(
  functions: MiddlewareFactory[],
  index = 0
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = createMiddleware(functions, index + 1);
    return current(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response;
  };
}


export function defineMiddleware(middlewareFunc: NextMiddleware) {
  return (middleware: CustomMiddleware) => {
    return async (
      request: NextRequest,
      event: NextFetchEvent,
      response: NextResponse
    ) => {
      const newResponse = (await middlewareFunc(request, event) ?? response) as NextResponse;
      return middleware(request, event, newResponse);
    };
  }
}
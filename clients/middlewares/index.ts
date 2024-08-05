import { withAuth } from "./auth";
import { createMiddleware } from "./factory";
import { header } from "./header";

const middlewares = createMiddleware(
  [
    // header, 
    withAuth
  ]
);

export default middlewares
import { handlers } from "@/auth" // Referring to the auth.ts we just created
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  let result;
  switch (requestMethod) {
    case "POST":
      result = await handlers.POST(req as any);
      res.status(200).json(result);
    case "GET":
      result = await handlers.GET(req as any);
      res.status(200).json(result);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${requestMethod} Not Allowed`);
  }
}


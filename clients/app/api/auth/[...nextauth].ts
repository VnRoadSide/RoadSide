import { handlers } from "@/auth"; // Referring to the auth.ts we just created
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const { GET, POST } = handlers;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        NextResponse.next(await POST(req as any));
    } else if (req.method === 'GET') {
        NextResponse.next(await GET(req as any));
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import { environment } from "@/environment";
import { Notification } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const generateData = (count: number, offset: number) => {
  const data: Notification[] = [];
  for (let i = offset; i < count + offset; i++) {
    data.push({
      dateCreated: new Date("2023-04-28"),
      description: `Đơn hàng ${
        i + 1
      } đã được bàn giao đến đối tác vận chuyển TED. Đơn hàng sẽ được giao trước 23:59 ngày 28/04/2023. Quý khách vui lòng giữ liên lạc qua điện thoại.`,
      url: `/`,
    });
  }
  return data;
};

const total = 37;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    res.status(400).json({ error: "Missing url" });
    return;
  }

  console.log("url: ", req.url);
  const url = new URL(`${environment.appUrl}${req.url}`);
  const take = parseInt(url.searchParams.get("take") ?? "10");
  const skip = (parseInt(url.searchParams.get("page") ?? "1") - 1) * take;
  res.status(200).json({notifications: generateData(take, skip), total, totalPage: Math.ceil(total / take)});
}

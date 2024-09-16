import { Notification } from "@/models";
import { NextRequest } from "next/server";

const generateData = (count: number, offset: number) => {
  const data: Notification[] = [];
  for (let i = offset; i < count + offset; i++) {
    data.push({
      createOn: new Date("2023-04-28"),
      content: `Đơn hàng ${
        i + 1
      } đã được bàn giao đến đối tác vận chuyển TED. Đơn hàng sẽ được giao trước 23:59 ngày 28/04/2023. Quý khách vui lòng giữ liên lạc qua điện thoại.`,
      url: `/`,
    });
  }
  return data;
};

const total = 37;

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const take = parseInt(searchParams.get("take") ?? "10");
  const skip = (parseInt(searchParams.get("page") ?? "1") - 1) * take;
  return Response.json({
    notifications: generateData(take, skip),
    total,
    totalPage: Math.ceil(total / take),
  });
}

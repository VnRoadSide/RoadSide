import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const features = [
  {
    icon: "IconGauge",
    title: "Giao hàng tận nơi",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
  },
  {
    icon: "IconUser",
    title: "Thực phẩm tươi, sạch và an toàn",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
  },
  {
    icon: "IconCookie",
    title: "Phối hợp với các bên thứ ba uy tín",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
  },
  {
    icon: "IconLock",
    title: "Bảo mật và an toàn",
    description:
      "Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right",
  },
  {
    icon: "IconMessage2",
    title: "Chăm sóc khách hàng 24/7",
    description:
      "Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(features);
}

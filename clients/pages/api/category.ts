import { Category } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

const categories: Category[] = [
  {
    label: "Trái cây & Rau củ",
    icon: "IconSalad",
    children: [
      { label: "Trái cây", link: "/" },
      { label: "Rau củ", link: "/" },
    ],
  },
  {
    label: "Thịt cá",
    icon: "IconFish",
    children: [
      { label: "Hải sản", link: "/" },
      { label: "Thịt", link: "/" },
    ],
  },
  {
    label: "Ngũ cốc",
    icon: "IconCoffee",
    children: [
      { label: "Nuts & biscuits", link: "/" },
      { label: "Chocolates", link: "/" },
      { label: "Crisps", link: "/" },
      { label: "Noodles & Pasta", link: "/" },
      { label: "Sauces", link: "/" },
      { label: "Soup", link: "/" },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(categories);
}

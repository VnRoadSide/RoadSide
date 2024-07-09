import { Category } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

const categories: Category[] = [
  {
    name: "Trái cây & Rau củ",
    icon: "IconSalad",
    categories: [
      { name: "Trái cây", link: "/" },
      { name: "Rau củ", link: "/" },
    ],
  },
  {
    name: "Thịt cá",
    icon: "IconFish",
    categories: [
      { name: "Hải sản", link: "/" },
      { name: "Thịt", link: "/" },
    ],
  },
  {
    name: "Ngũ cốc",
    icon: "IconCoffee",
    categories: [
      { name: "Nuts & biscuits", link: "/" },
      { name: "Chocolates", link: "/" },
      { name: "Crisps", link: "/" },
      { name: "Noodles & Pasta", link: "/" },
      { name: "Sauces", link: "/" },
      { name: "Soup", link: "/" },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(categories);
}

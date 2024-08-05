
const orders = [
  {
    product: "IconGauge",
    total_order: "Giao hàng tận nơi",
    status:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    countdown: "100",
    shipping_unit: "Standard Express",
    operation: "View details",
  },
  {
    product: "IconGauge",
    total_order: "Giao hàng tận nơi",
    status:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    countdown: "100",
    shipping_unit: "Standard Express",
    operation: "View details",
  },
  {
    product: "IconGauge",
    total_order: "Giao hàng tận nơi",
    status:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    countdown: "100",
    shipping_unit: "Standard Express",
    operation: "View details",
  },
];

export function GET() {
  return Response.json(orders);
}

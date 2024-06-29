

export function formatNumber(value: number, shrink?: boolean): string {
  // Function to insert period as thousand separator
  const insertThousandSeparator = (num: number): string =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (!shrink) {
    return insertThousandSeparator(value);
  }
  // Check the scale of the number and format accordingly
  if (Math.abs(value) >= 1_000_000_000) {
    return (
      insertThousandSeparator(parseFloat((value / 1_000_000_000).toFixed(2))) +
      "B"
    );
  }
  if (Math.abs(value) >= 1_000_000) {
    return (
      insertThousandSeparator(parseFloat((value / 1_000_000).toFixed(2))) + "M"
    );
  }
  if (Math.abs(value) >= 1_000) {
    return (
      insertThousandSeparator(parseFloat((value / 1_000).toFixed(2))) + "k"
    );
  }
  return insertThousandSeparator(value);
}

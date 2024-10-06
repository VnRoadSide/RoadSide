import { Product } from "@/models";


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

export function getCurrentPrice(product: Product) {
  return product.discountedPrice ?? product.baseUnitPrice;
}

export function getPublicIdFromUrl(url: string): string | null {
  try {
    // Create a URL object to parse the URL
    const urlObject = new URL(url);

    // Extract the pathname from the URL object
    const pathname = urlObject.pathname;

    // Find the position of "/upload/" in the URL
    const uploadIndex = pathname.indexOf("/upload/");

    if (uploadIndex === -1) {
      return null; // Return null if "/upload/" is not found
    }

    // Extract the part of the path after "/upload/"
    const pathAfterUpload = pathname.substring(uploadIndex + "/upload/".length);

    // Remove the file extension to get the publicId
    const publicId = pathAfterUpload.substring(0, pathAfterUpload.lastIndexOf('.'));

    return publicId;
  } catch (error) {
    console.error("Invalid URL provided:", error);
    return null;
  }
}
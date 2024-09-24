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
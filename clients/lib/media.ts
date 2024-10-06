"use server";
import { auth } from '@/auth';
import { useApi } from './hooks'; // Assuming you have a hook to handle API requests

// Function to handle media upload
export async function uploadMedia(formData: FormData) {
  const session = await auth();
  const { post } = useApi(session);

  // Make POST request to upload media
  const { data, error } = await post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Return uploaded media URL or handle the error
  if (error) {
    console.error('Media upload failed', error);
    return null;
  }

  return data?.url; // Assuming the backend responds with the media URL
}

// Function to handle media deletion
export async function deleteMedia(publicId: string | undefined) {
  if (!publicId) {
    console.error('No publicId provided for deletion');
    return null;
  }
  const session = await auth();
  const { delete: del } = useApi(session);

  // Make DELETE request to delete the media
  const { data, error } = await del(`/media/delete/${publicId}`);

  if (error) {
    console.error('Media deletion failed', error);
    return null;
  }

  return data; // Assuming the backend responds with success message
}

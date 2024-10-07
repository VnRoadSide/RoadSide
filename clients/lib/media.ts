import { useApi } from './hooks'; // Assuming you have a hook to handle API requests
import { Session } from 'next-auth';

// Function to handle media upload
export async function uploadMedia(file: File, session?: Session | null) {
  const { post } = useApi(session);
  const formData = new FormData();
  formData.append('file', file);
  // Make POST request to upload media
  const { data, error } = await post('/media/upload', formData, {
    headers: {
      'Content-Type': '*/*',
    },
  });

  return data?.url; // Assuming the backend responds with the media URL
}

// Function to handle media deletion
export async function deleteMedia(publicId: string | undefined, session?: Session) {
  if (!publicId) {
    console.error('No publicId provided for deletion');
    return null;
  }
  const { delete: del } = useApi(session);

  // Make DELETE request to delete the media
  const { data, error } = await del(`/media/delete/${publicId}`);

  if (error) {
    console.error('Media deletion failed', error);
    return null;
  }

  return data; // Assuming the backend responds with success message
}

"use client"; // Since file upload involves client-side operations

import { useState, useRef } from "react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Image, Group, Button, Text, Card } from "@mantine/core";
import { IconDownload, IconX, IconPhotoPlus } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { uploadMedia } from "@/lib/media"; // Assuming you have this helper function
import { Session } from "next-auth";

// Define props for the MediaPicker component
type MediaPickerProps = {
  session: Session | null;
  initialFileUrl?: string; // For displaying an initial image (optional)
  onUpload: (url: string) => void; // Callback to pass the uploaded file's URL to the parent
};

export default function MediaPicker({
  session,
  initialFileUrl = "",
  onUpload,
}: MediaPickerProps) {
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>(initialFileUrl ? [] : []); // Keep track of selected files
  const [previewUrl, setPreviewUrl] = useState(initialFileUrl); // For previewing image (if any)

  const handleUpload = async (acceptedFiles: File[]) => {
    const url = await uploadMedia(acceptedFiles[0], session); // Upload file
    if (url) {
      setFiles(acceptedFiles); // Store the accepted file
      setPreviewUrl(url); // Set the preview URL
      onUpload(url); // Pass the uploaded file URL to the parent component
    }
  };

  const previews = files.map((file, index) => (
    <Image
      key={index}
      src={URL.createObjectURL(file)} // Create a preview URL for the file
      alt={file.name}
      width={100}
      height={100}
      fit="cover"
    />
  ));

  return (
    <Card radius="md" shadow="md" withBorder>
      <Dropzone
        openRef={openRef}
        onDrop={handleUpload}
        onReject={(rejectedFiles) => console.log("rejected files", rejectedFiles)}
        radius="md"
        accept={[MIME_TYPES.jpeg]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group>
            <Dropzone.Accept>
              <IconDownload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              {previewUrl ? (
                <Image src={previewUrl} alt="Preview" width={100} height={100} fit="cover" />
              ) : files.length > 0 ? (
                <Group mt="sm">{previews}</Group>
              ) : (
                <IconPhotoPlus style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
              )}
            </Dropzone.Idle>
          </Group>

          <Text w={700} size="lg" mt="xl">
            <Dropzone.Accept>Kéo thả tệp tại đây</Dropzone.Accept>
            <Dropzone.Reject>Tệp phải là .jpeg và nhỏ hơn 30MB</Dropzone.Reject>
            {files.length > 0 || previewUrl ? (
              <Dropzone.Idle>Thay đổi hình ảnh</Dropzone.Idle>
            ) : (
              <Dropzone.Idle>Thêm hình ảnh</Dropzone.Idle>
            )}
          </Text>
          <Text size="sm" mt="xs" c="dimmed">
            Kéo thả tệp tại đây để tải lên. Lưu ý chỉ chấp nhận tệp có đuôi <i>.jpeg</i> kích thước dưới 30MB.
          </Text>
        </div>
      </Dropzone>

      <Button size="md" radius="xl" mt={"sm"} onClick={() => openRef.current?.()}>
        Chọn tệp
      </Button>
    </Card>
  );
}
